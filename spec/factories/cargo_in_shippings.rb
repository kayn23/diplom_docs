FactoryBot.define do
  factory :cargo_in_shipping do
    cargo { nil }
    shipping { nil }
    status { "MyString" }
  end
end
