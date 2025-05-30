class Warehouse < ApplicationRecord
  belongs_to :city
  has_many :start_orders, class_name: 'Order', foreign_key: 'start_warehouse_id'
  has_many :end_orders, class_name: 'Order', foreign_key: 'end_warehouse_id'
  has_many :from_routes, class_name: 'Route', foreign_key: 'start_warehouse_id', dependent: :destroy
  has_many :to_routes, class_name: 'Route', foreign_key: 'end_warehouse_id', dependent: :destroy

  def self.ransackable_attributes(_auth_object = nil)
    %w[name address active city_id] + _ransackers.keys
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

  scope :with_null_routes, lambda {
    joins('LEFT JOIN routes AS from_routes ON from_routes.start_warehouse_id = warehouses.id')
      .joins('LEFT JOIN routes AS to_routes ON to_routes.end_warehouse_id = warehouses.id')
      .where('from_routes.user_id IS NULL OR to_routes.user_id IS NULL')
      .distinct
  }

  scope :with_assigned_routes, lambda {
    joins('LEFT JOIN routes AS from_routes ON from_routes.start_warehouse_id = warehouses.id')
      .joins('LEFT JOIN routes AS to_routes ON to_routes.end_warehouse_id = warehouses.id')
      .where(
        '(from_routes.user_id IS NOT NULL AND (array_length(from_routes.delivery_days, 1) > 0)) OR ' \
        '(to_routes.user_id IS NOT NULL AND (array_length(to_routes.delivery_days, 1) > 0))'
      )
      .distinct
  }

  # scope :with_unassigned_or_no_routes, lambda {
  #   joins('LEFT JOIN routes AS from_routes ON from_routes.start_warehouse_id = warehouses.id')
  #     .joins('LEFT JOIN routes AS to_routes ON to_routes.end_warehouse_id = warehouses.id')
  #     .where('from_routes.id IS NULL OR from_routes.user_id IS NULL OR to_routes.id IS NULL OR to_routes.user_id IS NULL')
  #     .distinct
  # }

  scope :with_unassigned_or_no_routes, lambda {
    joins('LEFT JOIN routes AS from_routes ON from_routes.start_warehouse_id = warehouses.id')
      .joins('LEFT JOIN routes AS to_routes ON to_routes.end_warehouse_id = warehouses.id')
      .where(
        'from_routes.id IS NULL OR from_routes.user_id IS NULL OR cardinality(from_routes.delivery_days) = 0 OR ' \
          'to_routes.id IS NULL OR to_routes.user_id IS NULL OR cardinality(to_routes.delivery_days) = 0'
      )
      .distinct
  }

  def self.ransackable_scopes(_auth_object = nil)
    %i[with_null_routes with_assigned_routes with_unassigned_or_no_routes]
  end
end
