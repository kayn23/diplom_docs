class OrdersController < ApplicationController
  before_action :set_order, except: %i[index create]

  def index
    @orders = policy_scope(Order)
    @orders = @orders.ransack(params[:q]).result.page(params[:page])
  end

  def show; end

  def create
    @order = Order.new(create_params)
    @order.sender = current_user if current_user.low_rule?
    @order.receiver = nil if current_user.low_rule?
    authorize @order

    if @order.save
      render :create, status: :created
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  def cargo_accepted
    authorize @order
    unless @order.may_cargo_accepted?
      return render json: { errors: 'order not corge_accepted' },
                    status: :unprocessable_entity
    end

    @order.cargo_accepted
    if @order.update(calc_price_params)
      # TODO: тут должно улетать уведомление в соккет об ожидании оплаты
      # возможно стоит убрать вообще все изменения статусов в коллбэки AASM
      render :show, status: :ok
    else
      render json: { errors: @order.errors }, status: :unprocessable_entity
    end
  end

  def payment
    authorize @order
    ActiveRecord::Base.transaction do
      unless @order.may_pay?
        render json: { errors: 'Payment not available' }, status: :unprocessable_entity
        raise ActiveRecord::Rollback
      end

      @order.pay

      unless @order.save

        render json: { errors: @order.errors }, status: :unprocessable_entity
        raise ActiveRecord::Rollback
      end

      # TODO: тут должно улетать уведомление в соккет об изменении статуса
      # возможно стоит убрать вообще все изменения статусов в коллбэки AASM
      begin
        CargoDistributor.new(@order).distribute
        @order.accept_for_delivery!
      rescue CargoDistributor::NoActiveCarError, CargoDistributor::ValidationError,
             CargoDistributor::CargoTooLargeError => e
        render json: { errors: e.message }, status: :unprocessable_entity
        raise ActiveRecord::Rollback
      end

      render :show, status: :ok
    end
  end

  def hand_over
    authorize @order

    render 'show'
  end

  private

  def set_order
    @order = Order.eager_load(:sender, :receiver, :start_warehouse, :end_warehouse).find(params[:id])
  end

  def create_params
    params.permit(:start_warehouse_id, :end_warehouse_id, :sender_id, :receiver_id)
  end

  def calc_price_params
    params.permit(:price)
  end
end
