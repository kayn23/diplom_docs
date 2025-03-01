class CargosController < ApplicationController
  before_action :set_order
  before_action :set_cargo, only: %i[show update destroy]

  def index
    authorize @order
    @cargos = @order.cargos.page(params[:page])
  end

  def create
    @cargo = @order.cargos.new create_cargo_params
    authorize @cargo

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

  private

  def create_cargo_params
    params.permit(:size, :dimensions, :description)
  end

  def set_cargo
    @cargo = Cargo.find(params[:id])
  end

  def set_order
    @order = Order.includes(:cargos).find(params[:order_id])
  end
end
