require 'swagger_helper'

RSpec.describe 'Orders' do
  let!(:sender) { create(:user) }
  let!(:order) do
    create(:order, sender: sender)
  end
  let!(:token) { sender.auth_token }

  path '/api/orders' do
    get 'return correct list' do
      tags 'Список заказов'
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
  end
end
