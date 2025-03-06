class Cargo < ApplicationRecord
  belongs_to :order
  has_many :cargo_in_shippings
end
