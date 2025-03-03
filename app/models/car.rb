class Car < ApplicationRecord
  belongs_to :user

  def self.ransackable_attributes(_auth_object = nil)
    %w[active] + _ransackers.keys
  end
end
