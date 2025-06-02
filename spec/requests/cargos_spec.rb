require 'swagger_helper'

RSpec.describe 'Cargos', type: :request do
  let(:user) { create(:user) }
  let!(:order) { create(:order, sender: user) }
  let!(:manager) { create(:user, :manager) }

  path '/api/orders/{order_id}/cargos' do
    get 'get cargos' do
      tags 'cargos'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :order_id, in: :path, type: :string
      parameter name: :page, in: :query, type: :string

      response 200, 'ok' do
        let(:token) { order.sender.auth_token }
        let(:order_id) { order.id }
        let(:Authorization) { "Bearer #{token}" }
        let(:cargo) { create(:cargo) }
        let(:page) { '1' }

        before do
          order.cargos << cargo
          order.save
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data.count).to eq(1)
        end
      end
    end

    post 'create' do
      tags 'cargos'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :order_id, in: :path, type: :string
      parameter name: :create_cargo_params,
                in: :body,
                schema: { type: :object,
                          properties: {
                            size: { type: :number },
                            dimensions: { type: :number },
                            description: { type: :string }
                          },
                          required: %w[size dimensions] }

      let!(:courier) { create(:user, :courier) }

      let(:warehouse_from) { create(:warehouse) }
      let(:warehouse_to) { create(:warehouse) }
      let!(:to_route) { create(:route, :end_rc, start_warehouse: warehouse_from) }
      let!(:from_route) { create(:route, :start_rc, end_warehouse: warehouse_to) }
      let(:sender) { create(:user) }
      let(:receiver) { create(:user) }
      let(:order) { create(:order, start_warehouse: warehouse_from, end_warehouse: warehouse_to, sender:, receiver:) }

      let(:Authorization) { "Bearer #{manager.auth_token}" }
      let(:order_id) { order.id }
      let(:create_cargo_params) do
        {
          size: 5,
          dimensions: 0.4,
          description: 'хрупкий груз'
        }
      end

      context 'no car' do
        response 422, 'unprocessable_entity' do
          run_test! do |res|
            expect(res.body).to include('there is no active vehicle for the route')
          end
        end
      end

      context 'car present' do
        before :each do
          to_route.update(user: courier)
          from_route.update(user: courier)
        end

        context 'the load does not fit' do
          let(:create_cargo_params) do
            {
              size: 20,
              dimensions: 0.4,
              description: 'хрупкий груз'
            }
          end

          response 422, 'unprocessable_entity' do
            run_test! do |res|
              expect(res.body).to include('active transport vehicle cannot accommodate cargo')
            end
          end
        end

        response 201, 'created' do
          schema Swagger::Schemas::Models::CARGO
          run_test!
        end
      end
    end
  end

  path '/api/orders/{order_id}/cargos/{id}' do
    delete 'delete cargo' do
      tags 'cargos'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :order_id, in: :path, type: :string
      parameter name: :id, in: :path

      let(:Authorization) { "Bearer #{manager.auth_token}" }
      let(:order) { create(:order, status: 'wait_payment') }
      let(:order_id) { order.id }
      let(:cargo) { create(:cargo, order:) }
      let(:id) { cargo.id }

      response 204, 'ok' do
        run_test! do
          order.reload
          expect(order.cargos.size).to eq(0)
          expect(order.status).to eq('created')
          expect(order.price).to be_nil
        end
      end

      context "can't delete cargo" do
        let(:order) { create(:order, status: 'paid') }
        let(:order_id) { order.id }

        response 422, 'unprocessable_entity' do
          schema Swagger::Schemas::Errors::ERROR_SCHEMA
          run_test! do |response|
            expect(response.body).to include("Can't delete cargo")
          end
        end
      end
    end
  end

  path '/api/orders/{order_id}/cargos/{id}/hand_over' do
    post 'update status to issued' do
      tags 'cargos'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :order_id, in: :path, type: :string
      parameter name: :id, in: :path

      let(:Authorization) { "Bearer #{manager.auth_token}" }
      let(:order) { create(:order, status: 'awaiting_pickup', sender: user) }
      let(:order_id) { order.id }
      let!(:cargo) { create(:cargo, order:) }
      let(:id) { cargo.id }

      response 200, 'ok' do
        before do
          allow(OrderFinisherService).to receive(:new).and_return(double(call: true))
        end

        run_test! do
          cargo.reload
          expect(cargo.status).to eq('issued')
          expect(OrderFinisherService).to have_received(:new).with(order.id)
          expect(OrderFinisherService.new(1)).to have_received(:call)
        end
      end

      context 'order not awaiting_pickup' do
        let(:order) { create(:order, status: 'in_delivery', sender: user) }
        let(:order_id) { order.id }
        let!(:cargo) { create(:cargo, order:) }
        let(:id) { cargo.id }
        response 422, 'unprocessable_entity' do
          schema Swagger::Schemas::Errors::ERROR_SCHEMA
          run_test! do |response|
            expect(cargo.status).to eq('accepted')
          end
        end
      end

      context 'low rule' do
        response 403, 'forbidden' do
          let(:Authorization) { "Bearer #{user.auth_token}" }
          run_test!
        end
      end
    end
  end
end
