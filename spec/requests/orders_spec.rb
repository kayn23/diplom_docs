require 'swagger_helper'

RSpec.describe 'Orders' do
  let!(:sender) { create(:user) }
  let!(:order) do
    create(:order, sender: sender)
  end
  let!(:token) { sender.auth_token }

  path '/api/orders' do
    get 'list orders' do
      tags 'orders'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]

      response 200, 'correct response' do
        let(:Authorization) { "Bearer #{token}" }
        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data.count).to eq(1)
        end
      end

      response 200, 'empty list' do
        let(:Authorization) { "Beared #{create(:user).auth_token}" }
        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data.count).to eq(0)
        end
      end

      response 401, 'not authorization' do
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
                          required: %w[start_warehouse_id, end_warehouse_id] }

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

      response 201, 'create hight rule user' do
        let(:user) { create(:user, :admin) }
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
        let(:Authorization) { "Bearer #{user.auth_token}" }

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
end
