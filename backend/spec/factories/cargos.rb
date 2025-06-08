FactoryBot.define do
  factory :cargo do
    description { 'MyString' }
    size { 1.5 }
    dimensions { 1.5 }
    association :order, factory: :order
    qrcode { Faker::Internet.base64 }
    status { 'accepted' }
  end
end
