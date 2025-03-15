require 'rails_helper'

RSpec.describe OrderFinisherService do
  let!(:order) { create(:order, status: 'awaiting_pickup') }
  let!(:cargo) { create(:cargo, order:) }

  describe 'when all cargo issued' do
    let!(:cargo) { create(:cargo, order:, status: 'issued') }

    it 'should change order status to completed' do
      OrderFinisherService.new(order.id).call
      order.reload
      expect(order.status).to eq('completed')
    end
  end

  describe 'when not all cargo issued' do
    it 'should change order status to completed' do
      OrderFinisherService.new(order.id).call
      order.reload
      expect(order.status).to eq('awaiting_pickup')
    end
  end
end
