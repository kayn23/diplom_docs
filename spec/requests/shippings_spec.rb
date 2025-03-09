require 'swagger_helper'

RSpec.describe 'Shippings', type: :request do
  shipping_index_schema =
    {
      type: :array, items: Swagger::Schemas::Models::SHIPPING
    }

  path '/api/shippings' do
    get 'get shippings list' do
      tags 'shippings'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :q, in: :query, type: :object, schema: {
        type: :object,
        properties: {
          'q[status_eq]': { type: :string, description: 'Пример Статус заказа' }
        }
      }, description: 'Параметры поиска с использованием Ransack'

      context 'courier' do
        let(:user) { create(:user, :courier) }
        let!(:shipping) { create(:shipping, assignee: user) }
        let!(:shipping_two) { create(:shipping, assignee: user, status: 'delivering') }
        let(:Authorization) { "Bearer #{user.auth_token}" }
        let(:q) { {} }

        response 200, 'ok' do
          schema shipping_index_schema
          run_test!
        end

        context 'ransack' do
          context 'self params' do
            let(:q) { { 'q[status_in]': 'created' } }

            response 200, 'ok' do
              run_test! do |response|
                data = JSON.parse(response.body)
                expect(data.count).to eq(1)
              end
            end
          end

          context 'relation params' do
            let(:q) { { 'q[route_start_warehouse_name_eq]': shipping.route.start_warehouse.name } }

            response 200, 'ok' do
              run_test! do |response|
                data = JSON.parse(response.body)
                expect(data.count).to eq(1)
              end
            end
          end
        end
      end

      context 'admin' do
        let(:user) { create(:user, :courier) }
        let!(:shipping) { create(:shipping, assignee: user) }
        let(:admin) { create(:user, :admin) }
        let(:Authorization) { "Bearer #{admin.auth_token}" }
        let(:q) { {} }

        response 200, 'ok' do
          schema shipping_index_schema
          run_test!
        end
      end

      context 'user' do
        let(:user) { create(:user) }
        let(:q) { {} }
        response 403, 'forbidden' do
          let(:Authorization) { "Bearer #{user.auth_token}" }

          schema Swagger::Schemas::Errors::ERROR_SCHEMA
          run_test!
        end
      end
    end
  end

  path '/api/shippings/{id}/start_load' do
    post 'start load' do
      tags 'shippings'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :id, in: :path

      context 'courier' do
        let(:user) { create(:user, :courier) }
        let(:shipping) { create(:shipping) }
        let(:Authorization) { "Bearer #{user.auth_token}" }
        let(:id) { shipping.id }

        response 200, 'ok' do
          schema Swagger::Schemas::Models::SHIPPING
          run_test!
        end

        context "shipping can't start load" do
          before do
            shipping.update(status: 'completed')
          end

          response 422, 'unprocessable_entity' do
            schema Swagger::Schemas::Errors::ERROR_SCHEMA
            run_test!
          end
        end

        context 'other courier' do
          let(:other_user) { create(:user, :courier) }
          let(:Authorization) { "Bearer #{other_user.auth_token}" }

          response 200, 'ok' do
            schema Swagger::Schemas::Models::SHIPPING
            run_test! do |response|
              data = JSON.parse(response.body)
              expect(data['assignee_id']).to eq(other_user.id)
            end
          end
        end
      end
    end
  end

  path '/api/shippings/{id}/start_delivery' do
    post 'start load' do
      tags 'shippings'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :id, in: :path

      let!(:user) { create(:user, :courier) }
      let!(:shipping) { create(:shipping, assignee: user, status: 'loading') }
      let(:Authorization) { "Bearer #{user.auth_token}" }
      let(:id) { shipping.id }

      context 'courier' do
        response 200, 'ok' do
          before do
            1..3.times.each do
              shipping.cargo_in_shippings << create(:cargo_in_shipping, status: 'loaded_cargo')
            end
          end
          schema Swagger::Schemas::Models::SHIPPING

          run_test! do |response|
            shipping.reload
            expect(shipping.status).to eq('delivering')
            expect(shipping.cargo_in_shippings.where(status: 'delivering').count)
              .to eq(shipping.cargo_in_shippings.count)
          end
        end

        context "shipping can't start delivery becouse all congo net loaded" do
          before do
            1..3.times.each do
              shipping.cargo_in_shippings << create(:cargo_in_shipping)
            end
          end
          response 422, 'unprocessable entity' do
            schema Swagger::Schemas::Errors::ERROR_SCHEMA
            run_test!
          end
        end

        context "shipping can't start delivery because status not created" do
          before do
            shipping.update(status: 'created')
          end
          response 422, 'unprocessable entity' do
            schema Swagger::Schemas::Errors::ERROR_SCHEMA
            run_test!
          end
        end
      end

      context 'other user' do
        let(:other_user) { create(:user, :courier) }
        let(:Authorization) { "Bearer #{other_user.auth_token}" }

        response 403, 'forbidden' do
          schema Swagger::Schemas::Errors::ERROR_SCHEMA
          run_test!
        end
      end
    end
  end
end
