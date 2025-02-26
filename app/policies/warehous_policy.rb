class WarehousPolicy < ApplicationPolicy
  def index?
    true
  end

  def creare?
    user.admin?
  end

  def update?
    create?
  end

  def destroy?
    create?
  end
end
