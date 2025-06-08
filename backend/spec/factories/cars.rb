FactoryBot.define do
  factory :car do
    capacity { 10 }
    load_capacity { 10 }
    name { 'test car' }
    association :user, factory: :user

    trait :active do
      active { true }
    end
  end
end
