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

  def link_warehouse_to_distribution_center
    # исключение функционала для единтвенного склада
    # данныый склад не создает на себя маршруты ибо сам является точкой для создания маршрутов
    return if name == 'РЦ'

    distribution_center = Warehouse.find_by(name: 'РЦ')
    to_routes.create!(start_warehouse: distribution_center, end_warehouse: self)
    from_routes.create!(start_warehouse: self, end_warehouse: distribution_center)
    # Логика создания маршрута
  end

  def from_route
    from_routes.last
  end

  def to_route
    to_routes.last
  end
end
