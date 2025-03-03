FactoryBot.define do
  factory :role do
    name { 'client' } # По умолчанию

    trait :admin do
      name { 'admin' }
    end

    trait :manager do
      name { 'manager' }
    end

    trait :courier do
      name { 'courier' }
    end
  end
end
