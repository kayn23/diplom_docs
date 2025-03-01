class Shipping < ApplicationRecord
  include AASM

  belongs_to :route
  belongs_to :assignee, class_name: 'User'

  has_many :cargos, class_name: 'CargeInShipping'

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
end
