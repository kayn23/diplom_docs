class ApplicationController < ActionController::API
  include Pundit::Authorization
  include AuthorizeRequest

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def user_not_authorized
    render json: { error: 'You are not authorized to perform this action' }, status: :forbidden
  end
end
