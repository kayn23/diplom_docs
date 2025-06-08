FactoryBot.define do
  factory :shipping do
    association :route, factory: :route
    association :assignee, factory: :user
    date { Faker::Date.in_date_period }
    status { 'created' }
  end
end
