module Swagger
  module Schemas
    module Models
      USER_SCHEMA = {
        type: :object,
        properties: {
          id: { type: :number },
          email: { type: :string },
          firstname: { type: :string },
          surname: { type: :string },
          roles: { type: :array, items: { type: :string } }
        },
        required: %w[id email roles]
      }.freeze

      WAREHOUSE = {
        type: :object,
        properties: {
          id: { type: :number },
          name: { type: :string },
          address: { type: :string },
          city_id: { type: :number },
          active: { type: :boolean }
        },
        required: %w[id name address city_id active]
      }.freeze
    end
  end
end
