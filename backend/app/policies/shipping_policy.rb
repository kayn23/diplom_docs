class ShippingPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      return scope if user.high_rule?

      scope.where(assignee: user)
    end
  end

  def index?
    user.courier? || user.high_rule?
  end

  def show?
    index?
  end

  def start_load?
    user.courier? || user.admin?
  end

  def start_delivery?
    record.assignee == user || user.admin?
  end
end
