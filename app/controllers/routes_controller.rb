class RoutesController < ApplicationController
  before_action :set_route, only: %i[update]

  def update
    authorize @route
    if @route.update(update_params)
      render :show, status: :ok
    else
      render json: { errors: @route.errors }, status: :unprocessable_entiry
    end
  end

  private

  def set_route
    @route = Route.find(params[:id])
  end

  def update_params
    params.permit(:user_id)
  end
end
