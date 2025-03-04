class OrdersController < ApplicationController
  before_action :set_order, only: %i[show update destroy payment]

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

  def payment
    render json: { errors: 'Payment not available' }, status: :unprocessable_entity unless @order.may_pay?
    # TODO
  end

  def update; end

  def destroy; end

  private

  def set_order
    @order = Order.eager_load(:sender, :receiver, :start_warehouse, :end_warehouse).find(params[:id])
  end

  def create_params
    params.permit(:start_warehouse_id, :end_warehouse_id, :sender_id, :receiver_id)
  end
end
