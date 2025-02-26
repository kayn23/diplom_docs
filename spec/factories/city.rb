FactoryBot.define do
  factory :city do
    name { Faker::Address.city }
    region { Faker::Address.state }
  end
end
