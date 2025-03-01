require 'swagger_helper'

RSpec.describe 'Cargos', type: :request do
  let!(:order) { create(:order) }
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
end
