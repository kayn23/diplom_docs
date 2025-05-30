class CargoInShippingPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.high_rule?
        scope.all
      else
        scope.where(user_id: user.id)
      end
    end
  end

  def index
    user.courier? || user.high_rule?
  end

  def load?
    user.courier? || user.high_rule?
  end

  def upload?
    user.high_rule?
  end

  def upload_cargo?
    upload?
  end
end
