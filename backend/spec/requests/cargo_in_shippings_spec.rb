require 'swagger_helper'

RSpec.describe 'CargoInShippings' do
  let!(:courier) { create(:user, :courier) }
  let!(:cargo) { create(:cargo) }
  let!(:shipping) { create(:shipping, assignee: courier, status: 'loading') }
  let!(:cargo_in_shipping) { create(:cargo_in_shipping, shipping:, cargo:) }

  path '/api/shippings/{shipping_id}/cargo_in_shippings' do
    get 'list' do
      tags 'cargo_in_shipping'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :shipping_id, in: :path

      response 200, 'ok' do
        let(:Authorization) { "Bearer #{courier.auth_token}" }
        let(:shipping_id) { shipping.id }

        run_test!
      end
    end
  end

  path '/api/shippings/{shipping_id}/cargo_in_shippings/{id}/load' do
    post 'load' do
      tags 'cargo_in_shipping'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :shipping_id, in: :path
      parameter name: :id, in: :path

      context 'courier' do
        let(:Authorization) { "Bearer #{courier.auth_token}" }
        let(:id) { cargo_in_shipping.cargo.id }
        let(:shipping_id) { shipping.id }

        response 200, 'ok' do
          schema Swagger::Schemas::Models::CARGO_IN_SHIPPING
          run_test! do
            cargo_in_shipping.reload
            expect(cargo_in_shipping.status).to eq('loaded_cargo')
          end
        end

        context 'cargo not load' do
          let(:cargo_in_shipping) { create(:cargo_in_shipping, shipping:, cargo:, status: 'delivering') }

          response 422, 'unprocessable_entity' do
            schema Swagger::Schemas::Errors::ERROR_SCHEMA
            run_test! do |response|
              expect(response.body).to include('cargo cannot be loaded')
            end
          end
        end

        context 'attempting to access a resource that is not available' do
          response 403, 'forbidden' do
            let(:other_courier) { create(:user, :courier) }
            let(:Authorization) { "Bearer #{other_courier.auth_token}" }

            schema Swagger::Schemas::Errors::ERROR_SCHEMA
            run_test!
          end
        end

        context 'shipping not in loading status' do
          response 422, 'unprocessable_entity' do
            let(:shipping) { create(:shipping, assignee: courier) }
            let(:shipping_id) { shipping.id }

            schema Swagger::Schemas::Errors::ERROR_SCHEMA
            run_test! do |response|
              expect(response.body).to include('delivery not in loading status')
            end
          end
        end
      end
    end
  end
end
