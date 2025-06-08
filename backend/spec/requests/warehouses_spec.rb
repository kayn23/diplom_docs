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

      parameter name: :q, in: :query, type: :object, schema: {
        type: :object,
        properties: {
          'q[city_id_eq]': { type: :number, description: 'Пример город' }
        }
      }, description: 'Параметры поиска с использованием Ransack'

      response 200, 'correct response' do
        let(:q) { {} }

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

      response 401, 'unauthorized' do
        schema Swagger::Schemas::Errors::ERROR_SCHEMA
        let(:Authorization) { '' }
        let(:create_warehouse_params) { { name: 'hello' } }
        run_test!
      end

      response 422, 'bad params' do
        schema Swagger::Schemas::Errors::ERROR_SCHEMA
        let(:Authorization) { "Bearer #{user.auth_token}" }
        let(:create_warehouse_params) { { name: 'hello' } }
        run_test!
      end
    end
  end

  path '/api/warehouses/{id}' do
    put 'update' do
      let!(:warehouse) { create(:warehouse) }

      tags 'Список складов'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :id, in: :path
      parameter name: :update_warehouse_params,
                in: :body,
                schema: {
                  type: :object,
                  properties: {
                    name: { type: :string },
                    address: { type: :string }
                  },
                  required: %w[name address city_id]
                }

      response 200, 'updated' do
        let(:Authorization) { "Bearer #{user.auth_token}" }
        let(:update_warehouse_params) do
          {
            name: Faker::Name.first_name,
            address: Faker::Address.street_address
          }
        end

        let(:id) { warehouse.id }
        run_test!
      end

      response 401, 'unauthorized' do
        schema Swagger::Schemas::Errors::ERROR_SCHEMA
        let(:Authorization) { '' }
        let(:id) { warehouse.id }
        let(:update_warehouse_params) { { name: 'hello' } }
        run_test!
      end
    end

    get 'show info' do
      let!(:warehouse) { create(:warehouse, :with_routes) }

      tags 'Список складов'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :id, in: :path

      response 200, 'ok' do
        schema Swagger::Schemas::Models::WAREHOUSE_DETAILS
        let(:Authorization) { "Bearer #{user.auth_token}" }
        let(:id) { warehouse.id }
        run_test!
      end

      response 404, 'not found' do
        let(:Authorization) { "Bearer #{user.auth_token}" }
        let(:id) { '99999999999' }
        run_test!
      end

      response 401, 'unauthorized' do
        schema Swagger::Schemas::Errors::ERROR_SCHEMA
        let(:Authorization) { '' }
        let(:id) { warehouse.id }
        run_test!
      end
    end
  end

  path '/api/warehouses/{warehouse_id}/upload_cargo/{id}' do
    post 'update_cargo' do
      let!(:warehouse) { create(:warehouse) }

      tags 'Список складов'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :warehouse_id, in: :path
      parameter name: :id, in: :path

      let!(:courier) { create(:user, :courier) }
      let!(:cargo) { create(:cargo) }
      let!(:shipping) { create(:shipping, assignee: courier, status: 'loading') }
      let!(:cargo_in_shipping) { create(:cargo_in_shipping, shipping:, cargo:) }

      let(:warehouse_id) { shipping.route.end_warehouse.id }
      let(:id) { cargo_in_shipping.cargo.id }
      let(:Authorization) { "Bearer #{user.auth_token}" }

      context 'user low rule' do
        response 403, 'forbidden' do
          let(:Authorization) { "Bearer #{courier.auth_token}" }

          schema Swagger::Schemas::Errors::ERROR_SCHEMA
          run_test!
        end
      end

      context 'user is high rule' do
        let(:user) { create(:user, :admin) }
        let(:Authorization) { "Bearer #{user.auth_token}" }

        context 'success validation' do
          let!(:shipping) { create(:shipping, assignee: courier, status: 'delivering') }
          let!(:cargo_in_shipping) { create(:cargo_in_shipping, shipping:, cargo:, status: 'delivering') }
          let(:shipping_id) { shipping.id }
          let(:id) { cargo_in_shipping.cargo.id }

          before do
            allow(ShippingFinisherService).to receive(:new).and_return(double(call: true))
            allow(OrderDeliveryFinisherService).to receive(:new).and_return(double(call: true))
          end

          response 200, 'ok' do
            schema Swagger::Schemas::Models::CARGO_IN_SHIPPING
            run_test! do
              cargo_in_shipping.reload
              expect(cargo_in_shipping.status).to eq('delivered')
              expect(ShippingFinisherService).to have_received(:new).with(shipping.id)
              expect(ShippingFinisherService.new(shipping.id)).to have_received(:call)
              expect(OrderDeliveryFinisherService).to have_received(:new).with(cargo.order.id)
              expect(OrderDeliveryFinisherService.new(1)).to have_received(:call)
            end
          end
        end

        context 'unprocessable_entity' do
          let(:shipping_id) { shipping.id }
          let(:id) { cargo_in_shipping.cargo.id }

          context 'delivery not in delivering' do
            response 422, 'unprocessable_entity' do
              schema Swagger::Schemas::Errors::ERROR_SCHEMA
              run_test! do |response|
                expect(response.body).to include('delivery not in delivering status')
              end
            end
          end

          context 'cargo cannot be uploaded' do
            let(:shipping) { create(:shipping, status: 'delivering') }
            let(:shipping_id) { shipping.id }

            response 422, 'unprocessable_entity' do
              schema Swagger::Schemas::Errors::ERROR_SCHEMA
              run_test! do |response|
                expect(response.body).to include('cargo cannot be uploaded')
              end
            end
          end
        end

        context 'the transferred warehouse does not correspond to the strict warehouse upon delivery' do
          let(:fake_warehouse) { create(:warehouse) }
          let(:warehouse_id) { fake_warehouse.id }
          let(:id) { cargo_in_shipping.cargo.id }

          response 404, 'not correct params' do
            run_test!
          end
        end
      end
    end
  end
end
