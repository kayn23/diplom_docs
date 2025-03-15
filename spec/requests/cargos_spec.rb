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

      response 201, 'created' do
        let(:Authorization) { "Bearer #{manager.auth_token}" }
        let(:order_id) { order.id }
        let(:create_cargo_params) do
          {
            size: 20,
            dimensions: 0.4,
            description: 'хрупкий груз'
          }
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data.keys.sort).to eq(%w[description dimensions id order_id qrcode size])
          expect(data['qrcode']).to include('data:image/png;base64,')
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
