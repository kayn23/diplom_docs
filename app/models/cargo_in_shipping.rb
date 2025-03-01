class CargoInShipping < ApplicationRecord
  include AASM

  belongs_to :cargo
  belongs_to :shipping

  aasm column: 'status' do
    state :wait, initial: true
    state :delivering
    state :delivered

    event :start_delivery do
      transitions from: :wait, to: :delivering
    end

    event :finish_delivery do
      transitions form: :delivering, to: :delivered
    end
  end
end
