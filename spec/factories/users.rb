FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { '232111' }
    firstname { Faker::Name.first_name }
    surname { Faker::Name.last_name }
    lastname { Faker::Name.last_name }
    document_number { Faker::Number.unique.number(digits: 10) }

    trait :admin do
      email { 'test_admin@gmail.com' }
      password { '232111' }

      after(:create) do |user|
        admin_role = create(:role, :admin) # Создаём роль admin
        user.roles << admin_role # Привязываем роль к пользователю
      end
    end

    trait :manager do
      after(:create) do |user|
        manager_role = create(:role, :manager) # Создаём роль admin
        user.roles << manager_role # Привязываем роль к пользователю
      end
    end

    trait :courier do
      transient do
        car { create(:car, :active) }
      end

      after(:create) do |user, evaluator|
        courier_role = create(:role, :courier) # Создаём роль admin
        user.roles << courier_role # Привязываем роль к пользователю
        user.cars << evaluator.car
      end
    end

    trait :courier_without_car do
      after(:create) do |user|
        courier_role = create(:role, :courier) # Создаём роль admin
        user.roles << courier_role # Привязываем роль к пользователю
      end
    end
  end
end
