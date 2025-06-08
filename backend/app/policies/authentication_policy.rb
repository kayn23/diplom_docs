class AuthenticationPolicy < ApplicationPolicy
  def login?
    true
  end
end
