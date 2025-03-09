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

  path '/api/users/{id}' do
    get 'show user info' do
      tags 'users'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :id, in: :path

      let!(:user) { create(:user) }
      let!(:other_user) { create(:user) }

      context 'user' do
        let(:Authorization) { "Bearer #{user.auth_token}" }

        response 200, 'ok' do
          let(:id) { user.id }

          schema Swagger::Schemas::Models::USER_SCHEMA
          run_test!
        end

        response 403, 'forbidden' do
          let(:id) { other_user.id }
          run_test!
        end
      end

      context 'admin' do
        let(:admin) { create(:user, :admin) }
        let(:Authorization) { "Bearer #{admin.auth_token}" }

        response 200, 'ok' do
          let(:id) { user.id }

          schema Swagger::Schemas::Models::USER_SCHEMA
          run_test! do |response|
            data = JSON.parse(response.body)
            expect(data.keys).to include('document_number')
          end
        end
      end
    end

    put 'update user' do
      tags 'users'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]
      parameter name: :id, in: :path
      parameter name: :update_user_param,
                in: :body,
                schema: {
                  type: :object,
                  properties: {
                    firstname: { type: :string },
                    surname: { type: :string },
                    lastname: { type: :string },
                    document_number: { type: :string }
                  }
                }

      let!(:user) { create(:user) }

      response 200, 'ok' do
        let(:document_number) { '2321232111' }
        let(:id) { user.id }
        let(:Authorization) { "Bearer #{user.auth_token}" }
        let(:update_user_param) do
          {
            document_number: document_number
          }
        end

        schema Swagger::Schemas::Models::USER_SCHEMA
        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['document_number']).to eq(document_number)
        end
      end
    end
  end
end
