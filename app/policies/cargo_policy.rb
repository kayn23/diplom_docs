class CargoPolicy < ApplicationPolicy
  def create?
    user.high_rule?
  end
end
