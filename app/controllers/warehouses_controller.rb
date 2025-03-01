class WarehousesController < ApplicationController
  before_action :set_warehouse, only: %i[show update destroy]
  skip_before_action :authorize_request, only: [:index]

  # GET /warehouses
  # GET /warehouses.json
  def index
    @warehouses = Warehouse.ransack(params[:q]).result.page(params[:page])
  end

  # POST /warehouses
  # POST /warehouses.json
  def create
    @warehouse = Warehouse.new(warehouse_params)
    authorize @warehouse

    if @warehouse.save
      @warehouse.link_warehouse_to_distribution_center
      render :show, status: :created, location: @warehouse
    else
      render json: @warehouse.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /warehouses/1
  # PATCH/PUT /warehouses/1.json
  def update
    if @warehouse.update(update_warehouse_params)
      render :show, status: :ok, location: @warehouse
    else
      render json: @warehouse.errors, status: :unprocessable_entity
    end
  end

  # DELETE /warehouses/1
  # DELETE /warehouses/1.json
  def destroy
    @warehouse.destroy!
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
end
