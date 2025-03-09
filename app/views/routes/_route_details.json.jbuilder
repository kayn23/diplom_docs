json.partial! 'routes/route', route: route
json.start_warehouse do
  json.partial! 'warehouses/warehouse', warehouse: route.start_warehouse
end

json.end_warehouse do
  json.partial! 'warehouses/warehouse', warehouse: route.end_warehouse
end
