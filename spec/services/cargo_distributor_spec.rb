require 'rails_helper'

RSpec.describe 'CargoDistributor' do
  let!(:rc) { create(:warehouse, :rc) }
  let!(:order) { create(:order) }
  let!(:user) { create(:user, :courier) }

  describe '#find_or_create_shipping' do
    let!(:car) { create(:car, user:, capacity: 10, load_capacity: 10, active: true) }
    let!(:route) { create(:route, user: user, delivery_days: [1, 2]) }

    context 'shipping present' do
      let!(:shipping) do
        create(:shipping, route:, assignee: user, status: 'created', date: route.nearest_delivery_date)
      end

      context 'cargo greeter car capacity' do
        it 'should return error' do
          c = CargoDistributor.new(order)
          expect { c.find_or_create_shipping(route, 15) }.to raise_error(CargoDistributor::CargoTooLargeError)
        end
      end

      context 'presented shipping can load more' do
        it 'should return shipping' do
          c = CargoDistributor.new(order)
          expect_shipping = c.find_or_create_shipping(route, 9)
          expect(expect_shipping).to_not be_falsy
          expect(expect_shipping.id).to eq(shipping.id)
        end
      end

      context "presented shipping can't load more" do
        let!(:cargo_in_shipping) { create(:cargo_in_shipping, shipping:, cargo: create(:cargo, size: 3)) }

        it 'should return shipping' do
          c = CargoDistributor.new(order)
          expect_shipping = c.find_or_create_shipping(route, 9)
          expect(expect_shipping).to_not be_falsy
          expect(expect_shipping.id).not_to eq(shipping.id)
          expect(Shipping.all.count).to eq(2)
        end
      end
    end

    context 'shipping not present' do
      it 'should return new shipping' do
        c = CargoDistributor.new(order)
        expect_shipping = c.find_or_create_shipping(route, 9)
        expect(expect_shipping).to_not be_falsy
        expect(Shipping.all.count).to be(1)
      end
    end

    context 'find or create after date' do
      let!(:other_route) { create(:route) }
      let!(:other_shipping) { create(:shipping, route:, assignee: user, date: other_route.nearest_delivery_date) }
      let!(:shipping) do
        create(:shipping, route:, assignee: user, status: 'created', date: route.nearest_delivery_date)
      end
      let(:cargo_distributor) { CargoDistributor.new(order) }

      it 'should return new shipping after input date' do
        shipping = cargo_distributor.find_or_create_shipping(route, 9, other_shipping.date + 1.day)
        expect(shipping.date).to be > other_shipping.date
        expect(shipping.id).to_not be(other_shipping.id)
      end
    end
  end

  describe '#distribute_cargos' do
    let!(:route) { create(:route, user:) }
    let(:cargo) { create(:cargo) }
    let!(:cargo_distributor) { CargoDistributor.new(order) }

    it 'should return shipping' do
      shipping = cargo_distributor.distribute_cargo cargo, route
      expect(shipping).not_to be_nil
      expect(shipping.cargo_in_shippings.count).to eq(1)
    end

    context 'when cargo large' do
      let(:cargo) { create(:cargo, size: 9_999_999) }

      it 'should return error' do
        expect { cargo_distributor.distribute_cargo cargo, route }.to raise_error(CargoDistributor::CargoTooLargeError)
      end
    end

    context 'user dont have active car' do
      let(:route) { create(:route, user: create(:user)) }

      it 'should return error' do
        expect { cargo_distributor.distribute_cargo cargo, route }.to raise_error(CargoDistributor::NoActiveCarError)
      end
    end
  end

  describe '#distribute' do
    let(:order) do
      create(:order,
             start_warehouse: create(:warehouse, :with_routes),
             end_warehouse: create(:warehouse, :with_routes))
    end
    let(:cargo) { create(:cargo) }
    let(:second_courier) { create(:user, :courier) }

    before do
      order.cargos << cargo
      order.end_warehouse.to_route.update!(user: second_courier)
      order.start_warehouse.from_route.update!(user:)
    end

    it 'should distribute cargo' do
      distribute_cargo = CargoDistributor.new(order)
      distribute_cargo.distribute

      expect(cargo.cargo_in_shippings.count).to be(2)
      a, b = cargo.cargo_in_shippings
      expect(a.shipping.date.to_date).to be > order.updated_at.to_date
      expect(b.shipping.date.to_date).to be > order.updated_at.to_date
    end

    context 'more one cargo' do
      let(:cargo2) { create(:cargo) }

      before do
        order.cargos << cargo2
      end

      it 'should distribute cargo' do
        distribute_cargo = CargoDistributor.new(order)
        distribute_cargo.distribute

        order.cargos.each do |cargo|
          expect(cargo.cargo_in_shippings.count).to be(2)
          a, b = cargo.cargo_in_shippings
          expect(a.shipping.date.to_date).to be > order.updated_at.to_date
          expect(b.shipping.date.to_date).to be > order.updated_at.to_date
        end
      end
    end
  end
end
