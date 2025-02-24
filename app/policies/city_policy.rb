class CityPolicy < ApplicationPolicy
  def index?
    true
  end

  def create?
    user.isAdmin?
  end

  def destroy?
    user.isHightRule?
  end
end
