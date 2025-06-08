class CityPolicy < ApplicationPolicy
  def index?
    true
  end

  def create?
    user.admin?
  end

  def destroy?
    user.admin?
  end
end
