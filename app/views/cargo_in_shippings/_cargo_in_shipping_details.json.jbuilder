json.extract! cargo_in_shippings, :id, :cargo_id, :shipping_id, :status
json.cargo do
  json.partial! 'cargos/cargo', cargo: cargo_in_shippings.cargo
end
json.shipping do
  json.partial! 'shippings/shipping', shipping: cargo_in_shippings.shipping
end
