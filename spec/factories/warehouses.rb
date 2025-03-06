FactoryBot.define do
  factory :warehouse do
    name { Faker::Company.name }
    address { Faker::Address.street_address }
    association :city

    trait :rc do
      name { 'РЦ' }
    end

    trait :with_routes do
      after(:create) do |warehouse|
        from_route = create(:route, :end_rc)
        to_route = create(:route, :start_rc)
        warehouse.to_routes << to_route
        warehouse.from_routes << from_route
      end
    end
  end
end
