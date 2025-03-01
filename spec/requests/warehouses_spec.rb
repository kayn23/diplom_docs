require 'swagger_helper'

RSpec.describe '/api/warehouses' do
  let!(:user) { create(:user, :admin) }
  let!(:city) { create(:city) }
  let!(:distribution_center) { create(:warehouse, :rc) }

  path '/api/warehouses' do
    get 'return correct list' do
      tags 'Список складов'
      produces 'application/json'
      consumes 'application/json'

      response 200, 'correct response' do
        run_test!
      end
    end

    post 'create' do
      tags 'Список складов'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :create_warehouse_params,
                in: :body,
                schema: { type: :object, properties: {
                  name: { type: :string },
                  address: { type: :string },
                  city_id: { type: :number }
                }, required: %w[name address city_id] }

      response 201, 'created' do
        let(:Authorization) { "Bearer #{user.auth_token}" }
        let(:create_warehouse_params) do
          {
            name: Faker::Name.first_name,
            address: Faker::Address.street_address,
            city_id: city.id
          }
        end
        run_test! do |response|
          data = JSON.parse(response.body)
          warehouse = Warehouse.find(data['id'])

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
end
