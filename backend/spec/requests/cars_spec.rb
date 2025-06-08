require 'swagger_helper'

RSpec.describe 'Cars' do
  let!(:courier) { create(:user, :courier_without_car) }
  let!(:admin) { create(:user, :admin) }
  let!(:other_user) { create(:user) }
  let!(:car) { create(:car, user: courier) }

  path '/api/users/{user_id}/cars' do
    get 'get car list' do
      tags 'user cars'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :user_id, in: :path

      response 200, 'ok' do
        let!(:car) { create(:car, user: courier) }
        let(:user_id) { courier.id }
        let(:Authorization) { "Bearer #{courier.auth_token}" }

        run_test! do |response|
          data = JSON.parse(response.body)

          expect(data.count).to eq(1)
        end
      end

      response 200, 'ok, admin' do
        let!(:car) { create(:car, user: courier) }
        let(:user_id) { courier.id }
        let(:Authorization) { "Bearer #{admin.auth_token}" }

        run_test! do |response|
          data = JSON.parse(response.body)

          expect(data.count).to eq(1)
        end
      end

      response 403, 'forbidden' do
        let!(:car) { create(:car, user: courier) }
        let(:user_id) { other_user.id }
        let(:Authorization) { "Bearer #{courier.auth_token}" }
        run_test!
      end
    end

    post 'create car' do
      tags 'user cars'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :user_id, in: :path
      parameter name: :create_car_params,
                in: :body,
                schema: {
                  type: :object,
                  properties: {
                    capacity: { type: :float },
                    load_capacity: { type: :float },
                    name: { type: :string }
                  },
                  require: %w[capacity load_capacity]
                }

      response 201, 'created' do
        let(:user_id) { courier.id }
        let(:Authorization) { "Bearer #{courier.auth_token}" }
        let(:create_car_params) do
          {
            capacity: 20.3,
            load_capacity: 10
          }
        end

        run_test!
      end

      response 201, 'created and active cars present' do
        let!(:active_car) { create(:car, user: courier, active: true) }
        let(:user_id) { courier.id }
        let(:Authorization) { "Bearer #{courier.auth_token}" }
        let(:create_car_params) do
          {
            capacity: 20.3,
            load_capacity: 10
          }
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['active']).to be_truthy
          active_car.reload
          expect(active_car.active).to be_falsy
        end
      end

      response 201, 'created by admin' do
        let(:user_id) { courier.id }
        let(:Authorization) { "Bearer #{admin.auth_token}" }
        let(:create_car_params) do
          {
            capacity: 20.3,
            load_capacity: 10
          }
        end

        run_test!
      end

      response 403, 'user client' do
        let(:user) { create(:user) }
        let(:user_id) { user.id }
        let(:Authorization) { "Bearer #{user.auth_token}" }
        let(:create_car_params) do
          {
            capacity: 20.3,
            load_capacity: 10
          }
        end
        schema Swagger::Schemas::Errors::ERROR_SCHEMA
        run_test!
      end

      response 403, 'created' do
        let(:user_id) { other_user.id }
        let(:Authorization) { "Bearer #{courier.auth_token}" }
        let(:create_car_params) do
          {
            capacity: 20.3,
            load_capacity: 10
          }
        end

        schema Swagger::Schemas::Errors::ERROR_SCHEMA

        run_test!
      end
    end
  end

  path '/api/users/{user_id}/cars/{id}' do
    put 'update car' do
      tags 'user cars'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :user_id, in: :path
      parameter name: :id, in: :path
      parameter name: :update_car_params,
                in: :body,
                schema: {
                  type: :object,
                  properties: {
                    capacity: { type: :float },
                    load_capacity: { type: :float },
                    name: { type: :string },
                    active: { type: :boolean }
                  },
                  require: %w[capacity load_capacity]
                }

      response 200, 'updated' do
        let(:id) { car.id }
        let(:user_id) { courier.id }
        let(:Authorization) { "Bearer #{courier.auth_token}" }
        let(:update_car_params) do
          {
            capacity: 20.3,
            load_capacity: 10
          }
        end

        run_test!
      end

      response 200, 'updated and active cars present' do
        let!(:active_car) { create(:car, user: courier, active: true) }
        let(:user_id) { courier.id }
        let(:Authorization) { "Bearer #{courier.auth_token}" }
        let(:id) { car.id }
        let(:update_car_params) do
          {
            capacity: 20.3,
            load_capacity: 10,
            active: true
          }
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['active']).to be_truthy
          active_car.reload
          expect(active_car.active).to be_falsy
        end
      end

      response 200, 'updated by admin' do
        let(:id) { car.id }
        let(:user_id) { courier.id }
        let(:Authorization) { "Bearer #{admin.auth_token}" }
        let(:update_car_params) do
          {
            capacity: 20.3,
            load_capacity: 10
          }
        end

        run_test!
      end

      response 403, 'user client' do
        let(:user) { create(:user) }
        let(:id) { car.id }
        let(:user_id) { user.id }
        let(:Authorization) { "Bearer #{user.auth_token}" }
        let(:update_car_params) do
          {
            capacity: 20.3,
            load_capacity: 10
          }
        end
        schema Swagger::Schemas::Errors::ERROR_SCHEMA
        run_test!
      end

      response 403, 'forbidden' do
        let(:id) { car.id }
        let(:user_id) { other_user.id }
        let(:Authorization) { "Bearer #{courier.auth_token}" }
        let(:update_car_params) do
          {
            capacity: 20.3,
            load_capacity: 10
          }
        end

        schema Swagger::Schemas::Errors::ERROR_SCHEMA

        run_test!
      end
    end

    delete 'delete car' do
      tags 'user cars'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :user_id, in: :path
      parameter name: :id, in: :path

      response 204, 'deleted' do
        let!(:active_car) { create(:car, user: courier, active: true) }
        let(:id) { car.id }
        let(:user_id) { courier.id }
        let(:Authorization) { "Bearer #{courier.auth_token}" }

        run_test!
      end

      response 422, 'one active car' do
        let(:id) { car.id }
        let(:user_id) { courier.id }
        let(:Authorization) { "Bearer #{courier.auth_token}" }
        before do
          car.update(active: true)
        end

        run_test!
      end
    end
  end
end
