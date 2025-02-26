FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { '232111' }
    firstname { Faker::Name.first_name }
    surname { Faker::Name.last_name }
    lastname { Faker::Name.last_name }
    document_number { Faker::Number.number(digits: 10) }

    factory :user_admin do
      email { 'admin@gmail.com' }
      password { '232111' }
    end
  end
end
