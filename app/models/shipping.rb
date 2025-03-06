class Shipping < ApplicationRecord
  class NoActiveCarError < StandardError
    def initialize
      super('No active car found for the assignee')
    end
  end

  include AASM

  belongs_to :route
  belongs_to :assignee, class_name: 'User'

  has_many :cargo_in_shippings

  validates :date, presence: true

  aasm column: 'status' do
    state :created, initial: true
    state :loading
    state :delivering
    state :completed

    event :start_load do
      transitions from: :created, to: :loading
    end

    event :start_delivery do
      transitions from: :loading, to: :delivering
    end

    event :finish do
      transitions from: :delivering, to: :completed
    end
  end

  # Скоуп для доставок со статусом 'created', у которых есть связанные CargoInShipping
  scope :created_with_cargos, lambda {
    left_joins(:cargo_in_shippings)
      .where(status: 'created')
      .distinct
  }

  def can_load_more?(size)
    total_cargo_size = cargo_in_shippings.joins(:cargo).sum('cargos.size')
    available_capacity = capacity
    available_capacity >= total_cargo_size + size
  end

  def capacity
    car = assignee.cars.find_by(active: true)
    raise NoActiveCarError.new unless car

    car.capacity
  end
end
