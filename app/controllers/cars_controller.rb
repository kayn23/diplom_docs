class CarsController < ApplicationController
  before_action :set_car, only: %i[show update destroy]
  before_action :set_user

  # GET /api/users/{id}/cars
  def index
    @cars = Car.where(user: @user).page(params[:page])
  end

  # GET /cars/1
  # GET /cars/1.json
  def show; end

  # POST /api/users/{id}/cars
  def create
    @car = @user.cars.new(car_params)
    authorize @car
    @car.active = true

    if CarModifier.new(@user, @car).call
      render :show, status: :created
    else
      render json: { errors: @car.errors }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/users/{id}cars/1
  def update
    authorize @car
    @car.assign_attributes(update_params)
    if CarModifier.new(@user, @car).call
      render :show, status: :ok
    else
      render json: { errors: @car.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /api/users/{id}cars/1
  def destroy
    authorize @car
    if @car.active
      render json: { errors: 'Unable to delete active machine' }, status: :unprocessable_entity
    else
      @car.destroy!
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_car
    @car = Car.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def car_params
    params.permit(:capacity, :load_capacity, :name)
  end

  def update_params
    params.permit(:active, :capacity, :load_capacity, :name)
  end

  def set_user
    @user = User.find(params[:user_id])
    authorize @user, :show?
  end
end
