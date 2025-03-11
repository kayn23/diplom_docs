class CargoInShippingPolicy < ApplicationPolicy
  def load?
    true
  end

  def upload?
    user.high_rule?
  end
end
