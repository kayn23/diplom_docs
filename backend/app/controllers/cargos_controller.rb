class CargosController < ApplicationController
  before_action :set_order
  before_action :set_cargo, only: %i[show update destroy hand_over destroy]

  def index
    authorize @order
    @cargos = @order.cargos.page(params[:page])
  end

  def create
    @cargo = @order.cargos.new create_cargo_params
    authorize @cargo

    from_car = @order.start_warehouse.from_route&.user&.cars&.find_by(active: true)
    to_car = @order.end_warehouse.to_route&.user&.cars&.find_by(active: true)

    if from_car.nil? || to_car.nil?
      return render json: { errors: 'there is no active vehicle for the route' }, status: :unprocessable_entity
    end

    if from_car.capacity < create_cargo_params[:size].to_f || to_car.capacity < create_cargo_params[:size].to_f
      return render json: { errors: 'active transport vehicle cannot accommodate cargo' }, status: :unprocessable_entity
    end

    if @cargo.save
      @cargo.update(qrcode: QrcodeGeneratorService.generate_base64({
        type: 'cargo',
        id: @cargo.id,
        invoice_id: @order.id
      }.to_json))

      render :show, status: :created
    else
      render json: { errors: @cargo.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @cargo
    unless %w[created wait_payment].include?(@cargo.order.status)
      return render json: { errors: "Can't delete cargo" }, status: :unprocessable_entity
    end

    @cargo.destroy
    @cargo.order.update(status: 'created', price: nil)
  end

  def hand_over
    authorize @order
    return render json: { errors: 'cargo cannot hand_over' }, status: :unprocessable_entity unless @cargo.may_hand_over?

    if @cargo.hand_over!
      OrderFinisherService.new(@order.id).call
      render :show, status: :ok
    else
      render json: { errors: @cargo.errors }, status: :unprocessable_entity
    end
  end

  private

  def create_cargo_params
    params.permit(:size, :dimensions, :description)
  end

  def set_cargo
    @cargo = Cargo.eager_load(:order).find(params[:id])
  end

  def set_order
    @order = Order.includes(:cargos).find(params[:order_id])
  end
end
