# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

load Rails.root.join('db/seeds/cities.rb')
load Rails.root.join('db/seeds/warehouses.rb')

# roles = %w[client manager courier admin]
#
# roles.each do |role_name|
#   Role.find_or_create_by(name: role_name)
# end
#
User.find_or_create_by(email: 'admin@gmail.com') do |u|
  u.password = '232111'
end
