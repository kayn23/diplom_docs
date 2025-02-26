FactoryBot.define do
  factory :order do
    association :sender, factory: :user
    association :receiver, factory: :user
    association :start_warehouse, factory: :warehouse
    association :end_warehouse, factory: :warehouse
    status { 'created' }
  end
end
