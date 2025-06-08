require 'rails_helper'

RSpec.describe 'ShippingFinisherService' do
  let!(:shipping) { create(:shipping, status: 'delivering') }

  describe 'when all cargos delivered' do
    let!(:cargo_in_shippings) { create(:cargo_in_shipping, shipping:, status: 'delivered') }
    let!(:cargo_in_shippings2) { create(:cargo_in_shipping, shipping:, status: 'delivered') }

    it 'should change shipping status to completed' do
      ShippingFinisherService.new(shipping.id).call
      shipping.reload
      expect(shipping.status).to eq('completed')
    end
  end

  describe 'when not all cargo in the delivery has the status delivered' do
    let!(:cargo_in_shippings) { create(:cargo_in_shipping, shipping:, status: 'delivered') }
    let!(:cargo_in_shippings2) { create(:cargo_in_shipping, shipping:) }

    it 'should not change shipping status to completed' do
      ShippingFinisherService.new(shipping.id).call
      shipping.reload
      expect(shipping.status).not_to eq('completed')
    end
  end

  describe 'when shipping cannot finish' do
    let(:shipping) { create(:shipping) }

    it 'should raise ShippingCantFinishError' do
      expect do
        ShippingFinisherService.new(shipping.id).call
      end.to raise_error(ShippingFinisherService::ShippingCantFinishError)
    end
  end
end
