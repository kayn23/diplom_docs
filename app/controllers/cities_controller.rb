class CitiesController < ApplicationController
  before_action :set_city, only: %i[destroy]
  skip_before_action :authorize_request, only: [:index]

  # GET /cities
  # GET /cities.json
  def index
    @cities = City.all.page(params[:page])
  end

  # POST /cities
  # POST /cities.json
  def create
    @city = City.new(city_params)
    authorize @city

    if @city.save
      render :show, status: :created, location: @city
    else
      render json: @city.errors, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotUnique => e
    # Логируем ошибку или выполняем дополнительные действия
    Rails.logger.error "Duplicate entry: #{e.message}"
    # Можно вернуть сообщение пользователю или выполнить другие действия
    render json: { error: 'This city with this region already exists' }, status: :unprocessable_entity
  end

  # DELETE /cities/1
  # DELETE /cities/1.json
  def destroy
    @city.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_city
    @city = City.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def city_params
    params.permit(:name, :region)
  end
end
