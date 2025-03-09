class Route < ApplicationRecord
  belongs_to :start_warehouse, class_name: 'Warehouse', foreign_key: 'start_warehouse_id'
  belongs_to :end_warehouse, class_name: 'Warehouse', foreign_key: 'end_warehouse_id'
  belongs_to :user, optional: true
  has_many :shippings

  validates :start_warehouse_id, presence: true
  validates :end_warehouse_id, presence: true

  validate :start_and_end_warehouses_must_be_different
  validate :delivery_days_must_be_valid

  def nearest_delivery_date(from_date = Date.today)
    from_date = Date.today if from_date.nil?
    from_date = from_date.to_date
    (from_date..from_date + 6.days).find { |date| delivery_days.include?(date.wday) }
  end

  def self.ransackable_attributes(auth_object = nil)
    %w[created_at delivery_days end_warehouse_id id start_warehouse_id updated_at user_id]
  end

  def self.ransackable_associations(_auth_object = nil)
    authorizable_ransackable_associations + %w[start_warehouse end_warehouse user]
  end

  private

  def start_and_end_warehouses_must_be_different
    return unless start_warehouse_id == end_warehouse_id

    errors.add(:end_warehouse, 'must be different from start warehouse')
  end

  def delivery_days_must_be_valid
    return unless delivery_days.any? { |day| !day.between?(1, 7) }

    errors.add(:delivery_days, 'must contain numbers between 1 and 7')
  end
end
