class Warehouse < ApplicationRecord
  belongs_to :city
  has_many :start_orders, class_name: 'Order', foreign_key: 'start_warehouse_id'
  has_many :end_orders, class_name: 'Order', foreign_key: 'end_warehouse_id'
end
