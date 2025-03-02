require 'swagger_helper'

RSpec.describe 'Routes', type: :request do
  let!(:admin_user) { create(:user, :admin) }

  path '/api/routes/{id}' do
    let!(:warehouse) { create(:warehouse) }

    put 'update route' do
      tags 'routes'
      produces 'application/json'
      consumes 'application/json'
      security [Bearer: {}]

      parameter name: :id, in: :path
      parameter name: :update_route_params,
                in: :body,
                schema: {
                  type: :object,
                  properties: {
                    user_id: { type: :number }
                  },
                  required: %w[user_id]
                }

      response 200, 'change assignee user' do
        let(:route) { create(:route, :start_rc) }
        let(:user) { create(:user) }
        let(:Authorization) { "Bearer #{admin_user.auth_token}" }
        let(:update_route_params) do
          {
            user_id: user.id
          }
        end
        let(:id) { route.id }

        schema type: :object,
               properties: {
                 id: { type: :number },
                 start_warehouse_id: { type: :number },
                 end_warehouse_id: { type: :number },
                 user_id: { type: :number }
               },
               required: %w[id start_warehouse_id end_warehouse_id user_id]

        run_test!
      end

      response 403, "user don't have rule for update" do
        let(:route) { create(:route, :start_rc) }
        let(:user) { create(:user) }
        let(:Authorization) { "Bearer #{user.auth_token}" }
        let(:update_route_params) do
          {
            user_id: user.id
          }
        end
        let(:id) { route.id }
        schema Swagger::Schemas::Errors::ERROR_SCHEMA

        run_test!
      end
    end
  end
end
