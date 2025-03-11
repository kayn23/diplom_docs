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

      ROUTE = {
        type: :object,
        properties: {
          id: { type: :number },
          start_warehouse_id: { type: :number },
          end_warehouse_id: { type: :number },
          user_id: { type: :number }
        },
        required: %w[id start_warehouse_id end_warehouse_id user_id]
      }.freeze

      ROUTE_DETAILS = {
        allOf: [
          ROUTE,
          {
            type: :object,
            properties: {
              start_warehouse: WAREHOUSE,
              end_warehouse: WAREHOUSE
            },
            required: %w[start_warehouse end_warehouse]
          }
        ]
      }.freeze

      SHIPPING = {
        type: :object,
        properties: {
          id: { type: :number },
          route_id: { type: :number },
          assignee_id: { type: :number },
          assignee: USER_SCHEMA,
          route: ROUTE_DETAILS,
          status: { type: :string },
          date: { type: :string }
        },
        required: %w[id route_id assignee_id assignee status date route]
      }.freeze

      CARGO_IN_SHIPPING = {
        type: :object,
        properties: {
          id: { type: :number },
          cargo_id: { type: :number },
          shipping_id: { type: :number }
        },
        required: %w[id cargo_id shipping_id]
      }.freeze
    end
  end
end
