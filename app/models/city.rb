class City < ApplicationRecord
  def self.ransackable_attributes(_auth_object = nil)
    %w[name] + _ransackers.keys
  end
end
