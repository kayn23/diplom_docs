class CargoInShipping < ApplicationRecord
  include AASM

  belongs_to :cargo
  belongs_to :shipping

  aasm column: 'status' do
    state :wait, initial: true
    state :loaded_cargo
    state :delivering
    state :delivered

    event :load do
      transitions from: :waid, to: :loaded_cargo
    end

    event :start_delivery do
      transitions from: :loaded_cargo, to: :delivering
    end

    event :finish_delivery do
      transitions from: :delivering, to: :delivered
    end
  end
end
