class CargoPolicy < ApplicationPolicy
  def create?
    user.high_rule?
  end

  def destroy?
    create?
  end
end
