class RoutePolicy < ApplicationPolicy
  def update?
    user.admin?
  end
end
