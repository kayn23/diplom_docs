class ApplicationController < ActionController::API
  include Pundit::Authorization
  include AuthorizeRequest

  attr_reader :current_user

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def user_not_authorized(exception)
    render json: { errors: 'You are not authorized to perform this action',
                   policy: exception.policy.class.to_s, # Название политики
                   action: exception.query }, status: :forbidden # Действие, которое запрещено
  end

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render json: { errors: 'Record not found' }, status: :not_found
  end
end
