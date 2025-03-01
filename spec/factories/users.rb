FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { '232111' }
    firstname { Faker::Name.first_name }
    surname { Faker::Name.last_name }
    lastname { Faker::Name.last_name }
    document_number { Faker::Number.number(digits: 10) }

    trait :admin do
      email { 'admin@gmail.com' }
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
  end
end
