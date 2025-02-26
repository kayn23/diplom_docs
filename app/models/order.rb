class Order < ApplicationRecord
  include AASM

  belongs_to :sender, class_name: 'User'
  belongs_to :receiver, class_name: 'User', optional: true
  belongs_to :start_warehouse, class_name: 'Warehouse'
  belongs_to :end_warehouse, class_name: 'Warehouse'

  # validates :price, numericality: { greater_than_or_equal_to: 0 }, on:

  aasm column: 'status' do
    state :created, initial: true
    state :wait_payment
    state :paid
    state :in_delivery
    state :awaiting_pickup
    state :completed
    state :canceled
    state :return_in_process
    state :returned

    event :cargo_accepted do
      transitions from: :created, to: :wait_payment
    end

    event :pay do
      transitions from: :wait_payment, to: :paid
    end

    event :accept_for_delivery do
      transitions from: :paid, to: :in_delivery
    end

    event :stock_received do
      transitions from: :in_delivery, to: :awaiting_pickup
    end

    event :hand_over do
      transitions from: :awaiting_pickup, to: :completed
    end

    event :cancel, guards: [:not_paid?] do
      transitions from: %i[created wait_payment], to: :canceled
    end
  end

  def not_paid?
    %w[created wait_payment].include?(status)
  end
end
