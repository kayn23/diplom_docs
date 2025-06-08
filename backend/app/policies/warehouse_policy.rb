class WarehousePolicy < ApplicationPolicy
  def index?
    true
  end

  def show?
    user.admin?
  end

  def create?
    user.admin?
  end

  def update?
    create?
  end

  def destroy?
    create?
  end
end
