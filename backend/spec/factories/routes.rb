FactoryBot.define do
  factory :route do
    association :start_warehouse, factory: :warehouse
    association :end_warehouse, factory: :warehouse
    association :user, factory: :user
    delivery_days { [1, 4] }

    trait :start_rc do
      association :start_warehouse, factory: :warehouse, name: 'РЦ'
    end

    trait :end_rc do
      association :end_warehouse, factory: :warehouse, name: 'РЦ'
    end
  end
end
