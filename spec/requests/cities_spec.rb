require 'swagger_helper'

RSpec.describe 'Cities' do
  path '/api/cities' do
    get 'list cities' do
      tags 'cities'
      produces 'application/json'
      consumes 'application/json'

      response 200, 'correct response' do
        run_test!
      end
    end
  end
end
