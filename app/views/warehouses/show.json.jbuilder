json.partial! 'warehouses/warehouse', warehouse: @warehouse
json.from_route do
  if @warehouse.from_route
    json.partial! 'routes/route', route: @warehouse.from_route
  else
    json.null!
  end
end

json.to_route do
  if @warehouse.to_route
    json.partial! 'routes/route', route: @warehouse.to_route
  else
    json.null!
  end
end
