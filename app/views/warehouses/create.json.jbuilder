json.extract! @warehouse, :id, :name, :address, :city_id, :active
json.city @warehouse.city.name
