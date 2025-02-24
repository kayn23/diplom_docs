class UsersController < ApplicationController
  include AuthorizeRequest
  before_action :find_user, include: [:update]

  def show
  end

  def update
    if @user.update(user_update_params)
      render 'show'
    else
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def add_roles
    @user.add_roles(params[:roles])
    render 'show'
  end

  def remove_roles
    @user.remove_roles(params[:roles])
    render 'show'
  end

  private

  def find_user
    @user = User.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'User not found' }, status: :not_found
  end

  def user_update_params
    # Разрешаем только эти параметры для обновления
    params.permit(:firstname, :surname, :lastname, :document_number)
  end
end
