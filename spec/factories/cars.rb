FactoryBot.define do
  factory :car do
    capacity { 1.5 }
    load_capacity { 1.5 }
    name { 'MyString' }
    association :user, factory: :user
  end
end
