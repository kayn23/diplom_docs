json.extract! warehouse, :id, :name, :address, :city_id, :active
json.city warehouse.city.name
json.full_city do
  json.partial! 'cities/city', city: warehouse.city
end
