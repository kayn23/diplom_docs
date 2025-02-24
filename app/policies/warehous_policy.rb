class WarehousPolicy < ApplicationPolicy
  def index?
    true
  end

  def creare?
    user.isAdmin?
  end

  def update?
    user.isAdmin?
  end

  def destroy?
    user.isAdmin?
  end
end
