class RoutesController < ApplicationController
  before_action :set_route, only: %i[update]

  def update
    authorize @route
    user = User.includes(:roles).find(update_params['user_id'])
    return render json: { errors: "user don't have courier role" }, status: :unprocessable_entity unless user.courier?

    if @route.update(update_params)
      render :show, status: :ok
    else
      render json: { errors: @route.errors }, status: :unprocessable_entity
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
