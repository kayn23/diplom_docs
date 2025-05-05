require 'swagger_helper'

RSpec.describe 'Orders' do
  let!(:sender) { create(:user) }
  let!(:order) do
    create(:order, sender: sender)
  end
  let!(:token) { sender.auth_token }
  let!(:admin) { create(:user, :admin) }

  order_show_schema = {
    type: :object,
    properties: {
      id: { type: :number },
      sender_id: { type: :number },
      receiver_id: { type: :number },
      start_warehouse_id: { type: :number },
      end_warehouse_id: { type: :number },
      status: { type: :string },
      price: { type: :string, nullable: true },
      created_at: { type: :string },
      updated_at: { type: :string },
      sender: Swagger::Schemas::Models::USER_SCHEMA,
      receiver: Swagger::Schemas::Models::USER_SCHEMA,
      start_warehouse: Swagger::Schemas::Models::WAREHOUSE,
      end_warehouse: Swagger::Schemas::Models::WAREHOUSE,
      delivery_date: { type: :string, nullable: true }
    },
    required: %w[id sender_id receiver_id start_warehouse_id end_warehouse_id status created_at
                 updated_at sender receiver start_warehouse end_warehouse]
  }

  path '/api/orders' do
    get 'list orders' do
      tags 'orders'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :q, in: :query, type: :object, schema: {
        type: :object,
        properties: {
          'q[status_eq]': { type: :string, description: 'Пример Статус заказа' }
        }
      }, description: 'Параметры поиска с использованием Ransack'

      response 200, 'correct response' do
        let(:q) { {} }
        let(:Authorization) { "Bearer #{token}" }
        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data.count).to eq(1)
        end
      end

      response 200, 'correct filter' do
        let(:Authorization) { "Bearer #{token}" }
        let(:q) { { 'q[status_eq]': 'canceled' } }
        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data.count).to eq(0)
        end
      end

      response 200, 'correct filter' do
        let!(:canceled_order) { create(:order, status: 'canceled', sender: sender) }
        let(:Authorization) { "Bearer #{token}" }
        let(:q) { { 'q[status_eq]': 'canceled' } }
        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data.count).to eq(1)
          expect(data[0]['status']).to eq('canceled')
        end
      end

      response 200, 'empty list' do
        let(:q) { {} }
        let(:Authorization) { "Beared #{create(:user).auth_token}" }
        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data.count).to eq(0)
        end
      end

      response 401, 'not authorization' do
        let(:q) { {} }
        let(:Authorization) { '' }
        run_test!
      end
    end

    post 'create order' do
      tags 'orders'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :create_order_params,
                in: :body,
                schema: { type: :object,
                          properties: {
                            sender_id: { type: :number },
                            receiver_id: { type: :number },
                            start_warehouse_id: { type: :number },
                            end_warehouse_id: { type: :number }
                          },
                          required: %w[start_warehouse_id end_warehouse_id] }

      response 201, 'created low rule users' do
        let(:sender) { create(:user) }
        let(:start_warehouse) { create(:warehouse) }
        let(:end_warehouse) { create(:warehouse) }
        let(:create_order_params) do
          {
            start_warehouse_id: start_warehouse.id,
            end_warehouse_id: end_warehouse.id
          }
        end
        let(:Authorization) { "Bearer #{sender.auth_token}" }

        schema Swagger::Schemas::Models::ORDER_DETAILS

        run_test! do |response|
          expect do
            post '/api/orders.json', params: create_order_params,
                                     headers: { Authorization: "Bearer #{sender.auth_token}" }
          end.to change(Order, :count).by(1)

          expect do
            post '/api/orders.json', params: create_order_params,
                                     headers: { Authorization: "Bearer #{sender.auth_token}" }
          end.to change(CheckOrderStatusJob.jobs, :size).by(1)

          data = JSON.parse(response.body)
          expect(data['sender_id']).to eq(sender.id)
          expect(data['receiver_id']).to be_nil
          expect(data['status']).to eq('created')

          job = CheckOrderStatusJob.jobs.last
          expect(job['at']).to be_within(1.second).of(72.hours.from_now.to_f)
        end
      end

      response 201, 'created low rule users with sender_id and receiver_id' do
        let(:sender) { create(:user) }
        let(:other_user) { create(:user) }
        let(:receiver) { create(:user) }
        let(:start_warehouse) { create(:warehouse) }
        let(:end_warehouse) { create(:warehouse) }
        let(:create_order_params) do
          {
            sender_id: other_user.id,
            receiver_id: receiver.id,
            start_warehouse_id: start_warehouse.id,
            end_warehouse_id: end_warehouse.id
          }
        end
        let(:Authorization) { "Bearer #{sender.auth_token}" }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['sender_id']).to eq(sender.id)
          expect(data['receiver_id']).to be_nil
        end
      end

      response 201, 'create high rule user' do
        let(:sender) { create(:user) }
        let(:receiver) { create(:user) }
        let(:start_warehouse) { create(:warehouse) }
        let(:end_warehouse) { create(:warehouse) }
        let(:create_order_params) do
          {
            sender_id: sender.id,
            receiver_id: receiver.id,
            start_warehouse_id: start_warehouse.id,
            end_warehouse_id: end_warehouse.id
          }
        end
        let(:Authorization) { "Bearer #{admin.auth_token}" }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['sender_id']).to eq(sender.id)
          expect(data['receiver_id']).to eq(receiver.id)
        end
      end

      response 401, 'now authorization' do
        let(:sender) { create(:user) }
        let(:start_warehouse) { create(:warehouse) }
        let(:end_warehouse) { create(:warehouse) }
        let(:create_order_params) do
          {
            start_warehouse_id: start_warehouse.id,
            end_warehouse_id: end_warehouse.id
          }
        end
        let(:Authorization) { '' }
        run_test!
      end
    end
  end

  path '/api/orders/{id}' do
    get 'get order info' do
      tags 'orders'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :id, in: :path

      response 200, 'ok' do
        let(:id) { order.id }
        let(:Authorization) { "Bearer #{sender.auth_token}" }

        schema order_show_schema
        run_test!
      end

      context 'order paid' do
        response 200, 'ok' do
          let(:order) { create(:order, status: 'awaiting_pickup') }
          let(:id) { order.id }
          let(:Authorization) { "Bearer #{admin.auth_token}" }

          before do
            allow(order).to receive(:delivery_date).and_return('2006-01-02')
          end

          updated_schema = order_show_schema.deep_dup
          updated_schema[:required] << 'delivery_date'

          schema updated_schema

          run_test!
        end
      end
    end
  end

  path '/api/orders/{id}/cargo_accepted' do
    post 'accept cargo, calc price' do
      tags 'orders'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :id, in: :path
      parameter name: :calc_price_params,
                in: :body,
                schema: {
                  type: :object,
                  properties: {
                    price: { type: :float }
                  }
                }

      context 'when high_rule user update price' do
        response 200, 'ok' do
          let(:id) { order.id }
          let(:calc_price_params) { { price: 200 } }
          let(:Authorization) { "Bearer #{admin.auth_token}" }
          schema order_show_schema

          run_test! do |response|
            data = JSON.parse(response.body)
            expect(data['status']).to eq('wait_payment')
            expect(data['price']).to eq('200.0')
          end
        end
      end

      context "when carge can't corge_accepted" do
        response 422, 'unprocessable_entity' do
          let(:order) { create(:order, status: 'paid') }
          let(:id) { order.id }
          let(:calc_price_params) { { price: 200 } }
          let(:Authorization) { "Bearer #{admin.auth_token}" }

          schema Swagger::Schemas::Errors::ERROR_SCHEMA
          run_test!
        end
      end

      context 'when call api not high_rule user' do
        response 403, 'forbidden' do
          let(:id) { order.id }
          let(:calc_price_params) { { price: 200 } }
          let(:Authorization) { "Bearer #{sender.auth_token}" }

          schema Swagger::Schemas::Errors::ERROR_SCHEMA
          run_test!
        end
      end
    end
  end

  path '/api/orders/{id}/payment' do
    post 'peyment order' do
      tags 'orders'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :id, in: :path

      context 'when high_rule user update payment' do
        response 200, 'ok' do
          before do
            allow(CargoDistributor).to receive(:new).and_return(double(distribute: true))
          end

          let(:order) { create(:order, status: 'wait_payment') }
          let(:id) { order.id }
          let(:Authorization) { "Bearer #{admin.auth_token}" }
          schema order_show_schema

          run_test! do |response|
            order.reload
            expect(order.status).to eq('in_delivery')
            expect(CargoDistributor).to have_received(:new).with(order)
            expect(CargoDistributor.new(order)).to have_received(:distribute)
          end
        end

        context 'CargoDistributor#distribute raised' do
          let(:order) { create(:order, status: 'wait_payment') }
          let(:id) { order.id }
          let(:Authorization) { "Bearer #{admin.auth_token}" }

          [{
            class_error: CargoDistributor::NoActiveCarError,
            message: 'there is no active vehicle for the route'
          },
           {
             class_error: CargoDistributor::CargoTooLargeError,
             message: 'active transport vehicle cannot accommodate cargo'
           },
           {
             class_error: CargoDistributor::ValidationError,
             message: 'Loads or routes not provided! Contact administrator!'
           }].each do |test_case|
            response 422, test_case[:class_error] do
              before do
                distributor_double = double('CargoDistributor')
                allow(distributor_double).to receive(:distribute).and_raise(test_case[:class_error])
                allow(CargoDistributor).to receive(:new).and_return(distributor_double)
              end

              schema Swagger::Schemas::Errors::ERROR_SCHEMA

              run_test! do |response|
                order.reload
                expect(order.status).to eq('wait_payment')
                expect(response.body).to include(test_case[:message])
              end
            end
          end
        end
      end

      context 'when call api not high_rule user' do
        response 403, 'forbidden' do
          let(:id) { order.id }
          let(:calc_price_params) { { price: 200 } }
          let(:Authorization) { "Bearer #{sender.auth_token}" }

          schema Swagger::Schemas::Errors::ERROR_SCHEMA
          run_test!
        end
      end
    end
  end
end
