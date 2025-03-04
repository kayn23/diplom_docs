require 'swagger_helper'

RSpec.describe 'Users' do
  let!(:admin) { create(:user, :admin) }
  let!(:admin_token) { "Bearer #{admin.auth_token}" }

  path '/api/users' do
    get 'list orders' do
      tags 'users'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :q, in: :query, type: :object, schema: {
        type: :object,
        properties: {
          'q[roles_name_eq]': { type: :string, description: 'Пример роль' }
        }
      }, description: 'Параметры поиска с использованием Ransack'

      response 200, 'correct response' do
        let(:q) { {} }
        let(:Authorization) { admin_token }
        schema type: :array, items: { type: Swagger::Schemas::Models::USER_SCHEMA }
        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data.count).to eq(1)
        end
      end

      response 200, 'correct filered response' do
        let(:q) { { 'q[roles_name_eq]': 'admin' } }
        let!(:user) { create(:user) }
        let(:Authorization) { admin_token }
        schema type: :array, items: { type: Swagger::Schemas::Models::USER_SCHEMA }
        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data.count).to eq(1)
        end
      end
    end
  end
end
