module Swagger
  module Schemas
    module Errors
      ERROR_SCHEMA = {
        type: :object,
        properties: {
          errors: {
            oneOf: [
              { type: :object,
                additionalProperties: {
                  oneOf: [
                    { type: :string },
                    {
                      type: :array,
                      items: {
                        type: :string
                      }
                    }
                  ]
                } },
              { type: :string }

            ]

          }
        },
        required: %w[errors]
      }.freeze
    end
  end
end
