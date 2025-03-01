class Warehouse < ApplicationRecord
  belongs_to :city
  has_many :start_orders, class_name: 'Order', foreign_key: 'start_warehouse_id'
  has_many :end_orders, class_name: 'Order', foreign_key: 'end_warehouse_id'
  has_many :from_routes, class_name: 'Route', foreign_key: 'start_warehouse_id', dependent: :destroy
  has_many :to_routes, class_name: 'Route', foreign_key: 'end_warehouse_id', dependent: :destroy

  def self.ransackable_attributes(_auth_object = nil)
    %w[name address active] + _ransackers.keys
  end

  def self.ransackable_associations(_auth_object = nil)
    authorizable_ransackable_associations + ['city']
  end
end
