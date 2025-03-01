FactoryBot.define do
  factory :warehouse do
    name { Faker::Company.name }
    address { Faker::Address.street_address }
    association :city

    trait :warehouse_rc do
      name { 'РЦ' }
    end
  end
end
