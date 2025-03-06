FactoryBot.define do
  factory :shipping do
    association :route, factory: :route
    association :assignee, factory: :user
    status { 'created' }
  end
end
