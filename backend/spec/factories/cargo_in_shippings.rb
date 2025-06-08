FactoryBot.define do
  factory :cargo_in_shipping do
    association :cargo, factory: :cargo
    association :shipping, factory: :shipping
    status { 'wait' }
  end
end
