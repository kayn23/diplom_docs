require 'rails_helper'

RSpec.describe 'Warehouse', type: :model do
  describe 'collback' do
    let!(:distribution_center) { create(:warehouse, :warehouse_rc) }
    let(:warehouse) { build(:warehouse) }

    context 'after_create' do
      it 'creates routes to and from the distribution_center' do
        expect do
          warehouse.save
        end.to change(Route, :count).by(2)

        expect(warehouse.from_routes.count).to eq(1)
        expect(warehouse.to_routes.count).to eq(1)

        from_route = warehouse.from_routes.first
        to_route = warehouse.to_routes.first

        expect(from_route.start_warehouse).to eq(warehouse)
        expect(from_route.end_warehouse).to eq(distribution_center)

        expect(to_route.start_warehouse).to eq(distribution_center)
        expect(to_route.end_warehouse).to eq(warehouse)
      end
    end
  end
end
