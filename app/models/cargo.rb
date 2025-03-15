class Cargo < ApplicationRecord
  belongs_to :order
  has_many :cargo_in_shippings

  include AASM
  aasm column: 'status' do
    state :accepted, initial: true
    state :issued

    event :hand_over do
      transitions from: :accepted, to: :issued do
        guard do
          can_hand_over?
        end
      end
    end
  end

  def can_hand_over?
    order.awaiting_pickup?
  end
end
