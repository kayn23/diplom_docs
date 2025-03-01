class CargoPolicy < ApplicationPolicy
  def create?
    user.hight_rule?
  end
end
