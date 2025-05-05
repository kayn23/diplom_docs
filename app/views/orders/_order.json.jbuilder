json.extract! order, :id, :sender_id, :receiver_id, :start_warehouse_id, :end_warehouse_id, :status, :price, :created_at,
              :updated_at

json.sender do
  json.partial! 'users/user', user: order.sender, current_user: nil
end

json.receiver do
  if order.receiver
    json.partial! 'users/user', user: order.receiver, current_user: nil
  else
    json.nil!
  end
end

json.start_warehouse do
  json.partial! 'warehouses/warehouse', warehouse: order.start_warehouse
end

json.end_warehouse do
  json.partial! 'warehouses/warehouse', warehouse: order.end_warehouse
end

json.delivery_date order.delivery_date if order.status_after_or_equal? :awaiting_pickup
