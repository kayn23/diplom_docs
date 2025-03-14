require 'rails_helper'

RSpec.describe 'OrderDeliveryFinisherService' do
  let!(:order) { create(:order, status: 'in_delivery') }

  let!(:start_route) { create(:route, :end_rc, start_warehouse: order.start_warehouse) }
  let!(:end_route) { create(:route, :start_rc, end_warehouse: order.end_warehouse) }
  let!(:start_shipping) { create(:shipping, route: start_route) }
  let!(:end_shipping) { create(:shipping, route: end_route) }

  let!(:cargo) { create(:cargo, order:) }
  let!(:second_cargo) { create(:cargo, order:) }

  describe 'when cargo delivered to end_warehouse' do
    let!(:end_cargo_in_shippings) { create(:cargo_in_shipping, cargo:, shipping: end_shipping, status: 'delivered') }
    let!(:second_end_cargo_in_shippings) do
      create(:cargo_in_shipping, cargo: second_cargo, shipping: end_shipping, status: 'delivered')
    end
    let!(:start_cargo_in_shippings) do
      create(:cargo_in_shipping, cargo:, shipping: start_shipping, status: 'delivered')
    end

    it 'should return correct order status' do
      OrderDeliveryFinisherService.new(order.id).call
      order.reload
      expect(order.status).to eq('awaiting_pickup')
    end
  end

  describe 'when cargo not delivered to end_warehouse' do
    let!(:end_cargo_in_shippings) { create(:cargo_in_shipping, cargo:, shipping: end_shipping, status: 'delivered') }
    let!(:second_end_cargo_in_shippings) do
      create(:cargo_in_shipping, cargo: second_cargo, shipping: end_shipping, status: 'delivering')
    end

    it 'should return correct order status' do
      OrderDeliveryFinisherService.new(order.id).call
      order.reload
      expect(order.status).to eq('in_delivery')
    end
  end
end
