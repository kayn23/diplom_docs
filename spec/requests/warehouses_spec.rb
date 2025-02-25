require 'swagger_helper'

RSpec.describe '/api/warehouses' do
  path '/api/warehouses' do
    get 'return correct list' do
      tags 'Список складов'
      produces 'application/json'
      consumes 'application/json'

      response 200, 'correct response' do
        run_test!
      end
    end
  end
end
