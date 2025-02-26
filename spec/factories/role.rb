FactoryBot.define do
  factory :role do
    name { 'client' } # По умолчанию

    trait :admin do
      name { 'admin' }
    end
  end
end
