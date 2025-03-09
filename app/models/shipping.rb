class Shipping < ApplicationRecord
  class NoActiveCarError < StandardError
    def initialize
      super('No active car found for the assignee')
    end
  end

  class NotAllCargoLoaded < StandardError
    def initialize
      super('not all cargo is loaded')
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
      before do
        raise NotAllCargoLoaded unless all_cargo_loaded?
      end
      after do
        update_cargo_in_shippings_status('delivering')
      end
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

  def self.ransackable_attributes(_auth_object = nil)
    %w[status date] + _ransackers.keys
  end

  def self.ransackable_associations(_auth_object = nil)
    authorizable_ransackable_associations + %w[route assignee]
  end

  private

  def all_cargo_loaded?
    cargo_in_shippings.all? do |cargo|
      cargo.loaded_cargo?
    end
  end

  def update_cargo_in_shippings_status(new_status)
    cargo_in_shippings.update_all(status: new_status)
  end
end
