FactoryBot.define do
  factory :warehouse do
    name { Faker::Company.name }
    address { Faker::Address.street_address }
    association :city
  end

  factory :warehouse_rc do
    name { 'РЦ' }
    address { Faker::Address.street_address }
    association :city
  end
end
