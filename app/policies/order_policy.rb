# frozen_string_literal: true

class OrderPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.hight_rule?
        scope.all
      else
        scope.where('sender_id = ? OR receiver_id = ?', user.id, user.id)
      end
    end
  end

  def index?
    true
  end

  def show?
    return @record.sender == user || @record.receiver == user if user.low_rule?

    true
  end

  def create?
    return record.sender_id == user.id if user.low_rule?

    true
  end

  def update?
    show?
  end

  def destroy?
    show?
  end
end
