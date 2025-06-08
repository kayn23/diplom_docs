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
          city: { type: :string },
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

      WAREHOUSE_DETAILS = {
        allOf: [
          WAREHOUSE,
          {
            type: :object,
            properties: {
              from_route: {
                oneOf: [
                  ROUTE,
                  { type: :null }
                ]
              },
              to_route: {
                oneOf: [
                  ROUTE,
                  { type: :null }
                ]
              }
            },
            required: %w[from_route to_route]
          }
        ]
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

      ORDER_DETAILS = {
        type: :object,
        properties: {
          id: { type: :number },
          sender_id: { type: :number },
          receiver_id: { type: :number, nullable: true },
          start_warehouse_id: { type: :number },
          end_warehouse_id: { type: :number },
          status: { type: :string },
          price: { type: :string, nullable: true },
          created_at: { type: :string },
          updated_at: { type: :string },
          sender: Swagger::Schemas::Models::USER_SCHEMA,
          receiver: {
            oneOf: [
              Swagger::Schemas::Models::USER_SCHEMA,
              { type: :null }
            ]
          },
          start_warehouse: Swagger::Schemas::Models::WAREHOUSE,
          end_warehouse: Swagger::Schemas::Models::WAREHOUSE
          # delivery_date: { type: :string, nullable: true }
        },
        required: %w[id sender_id receiver_id start_warehouse_id end_warehouse_id status created_at
                     updated_at sender receiver start_warehouse end_warehouse]
      }.freeze

      CARGO = {
        type: :object,
        properties: {
          id: { type: :number },
          size: { type: :number, description: 'Размер (м3)' },
          dimensions: { type: :number, description: 'Вес (кг)' },
          description: { type: :string },
          qrcode: { type: :string },
          order_id: { type: :number },
          status: { type: :string }
        },
        required: %w[id size dimensions qrcode order_id status]
      }.freeze
    end
  end
end
