class AuthenticationController < ApplicationController
  skip_before_action :authorize_request, only: [:login]
  def login
    @user = User.find_by(email: params[:email])

    unless @user&.authenticate_password(params[:password])
      return render json: { errors: 'Invalid email or password' }, status: :unauthorized
    end

    @token = JsonWebToken.encode(user_id: @user.id)
    render 'authentication/login'
  end
end
