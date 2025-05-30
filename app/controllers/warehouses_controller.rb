class WarehousesController < ApplicationController
  before_action :set_warehouse, only: %i[show update destroy]
  skip_before_action :authorize_request, only: [:index]

  # GET /warehouses
  # GET /warehouses.json
  def index
    @warehouses = Warehouse.ransack(params[:q]).result.page(params[:page])
  end

  def show
    authorize @warehouse
  end

  # POST /warehouses
  # POST /warehouses.json
  def create
    @warehouse = Warehouse.new(warehouse_params)
    authorize @warehouse

    if @warehouse.save
      @warehouse.link_warehouse_to_distribution_center
      render :create, status: :created
    else
      render json: { errors: @warehouse.errors }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /warehouses/1
  # PATCH/PUT /warehouses/1.json
  def update
    if @warehouse.update(update_warehouse_params)
      render :show, status: :ok, location: @warehouse
    else
      render json: { errors: @warehouse.errors }, status: :unprocessable_entity
    end
  end

  def upload_cargo
    set_cargo_in_shipping
    authorize @cargo_in_shipping

    unless @shipping.delivering?
      return render json: { errors: 'delivery not in delivering status' },
                    status: :unprocessable_entity
    end

    unless @cargo_in_shipping.may_upload?
      return render json: { errors: 'cargo cannot be uploaded' }, status: :unprocessable_entity
    end

    if @cargo_in_shipping.upload!
      # TODO: возможно это надо выкинуть в воркеры,
      # но в тоже время в воркерах может быть проблема конкурентног доступа
      ShippingFinisherService.new(@cargo_in_shipping.shipping.id).call

      OrderDeliveryFinisherService.new(@cargo_in_shipping.cargo.order.id).call
      # тут надо запустить систему для проверки связанной доставки
      # если по доставке все грузы доставлены то закрыть достаку
      # Так же надо запускать проверки для заказов, что если в заказах все грузы доставлены,
      # то надо переводить заказы в статус ожидания выдачи,
      # но только если все грузы доставлены в конечную точку
      render 'cargo_in_shippings/show'
    else
      render json: { errors: @cargo_in_shipping.errors }, status: :unprocessable_entity
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_warehouse
    @warehouse = Warehouse.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def warehouse_params
    params.permit(:name, :address, :city_id)
  end

  def update_warehouse_params
    params.permit(:active, :name)
  end

  def set_cargo_in_shipping
    @cargo_in_shipping = CargoInShipping.joins(shipping: :route).find_by!(
      cargo_id: params[:id],
      route: { end_warehouse_id: params[:warehouse_id] }
    )
    @shipping = @cargo_in_shipping&.shipping
  end

  def upload_params
    params.permit(:shipping_id)
  end
end
