require 'swagger_helper'

RSpec.describe 'CargoInShippings' do
  let!(:courier) { create(:user, :courier) }
  let!(:cargo) { create(:cargo) }
  let!(:shipping) { create(:shipping, assignee: courier, status: 'loading') }
  let!(:cargo_in_shipping) { create(:cargo_in_shipping, shipping:, cargo:) }

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
        let(:id) { cargo_in_shipping.id }
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

  path '/api/shippings/{shipping_id}/cargo_in_shippings/{id}/upload' do
    post 'upload' do
      tags 'cargo_in_shipping'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :shipping_id, in: :path
      parameter name: :id, in: :path

      let(:shipping_id) { shipping.id }
      let(:id) { cargo_in_shipping.id }

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
          let(:id) { cargo_in_shipping.id }

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
          let(:id) { cargo_in_shipping.id }

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
      end
    end
  end
end
