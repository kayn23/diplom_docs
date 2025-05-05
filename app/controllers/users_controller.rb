class UsersController < ApplicationController
  before_action :find_user, except: %i[index create]

  def index
    @users = User.includes(:roles).ransack(params[:q]).result.page(params[:page])
  end

  def show
    authorize @user
    render 'show'
  end

  def create
    authorize current_user
    @user = User.new(user_create_params)

    if @user.save
      @user.reload
      render :show, status: :created
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  def update
    authorize @user
    if @user.update(user_update_params)
      render 'show'
    else
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def add_roles
    authorize @user
    @user.add_roles(role_params[:roles])
    render 'show'
  end

  def remove_roles
    authorize @user
    @user.remove_roles(role_params[:roles])
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

  def role_params
    params.permit(roles: [])
  end

  def user_create_params
    params.permit(:firstname, :surname, :lastname, :document_number, :email, :password)
  end
end
