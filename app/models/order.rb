class Order < ApplicationRecord
  belongs_to :sender, class_name: 'User'
  belongs_to :receiver, class_name: 'User'
  belongs_to :start_warehouse, class_name: 'Warehouse'
  belongs_to :end_warehouse, class_name: 'Warehouse'

  # validates :price, numericality: { greater_than_or_equal_to: 0 }, on:

  enum status: {
    created: 'created'
  }
end
