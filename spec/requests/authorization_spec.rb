require 'swagger_helper'

RSpec.describe 'authorization' do
  let(:password) { '232111' }
  let!(:user) { create(:user) }

  path '/api/login' do
    post 'return token and user info' do
      tags 'login'
      produces 'application/json'
      consumes 'application/json'
      parameter name: :user_params,
                in: :body,
                schema: { type: :object,
                          properties: {
                            email: { type: :string },
                            password: { type: :string }
                          },
                          required: %w[email password] }

      response 200, 'return tokens' do
        let(:user_params) do
          { email: user.email, password: }
        end
        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['user'].keys.sort).to eq %w[email firstname id lastname roles surname]
          expect(data.keys.sort).to eq %w[token user]
        end
      end

      response 401, 'bad password' do
        let(:user_params) do
          { email: user.email, password: '1231231231' }
        end

        run_test!
      end
    end
  end
end
