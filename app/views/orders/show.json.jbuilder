json.partial! 'orders/order', locals: { order: @order }
json.sender do
  json.partial! 'users/user', user: @order.sender, current_user: @current_user
end
json.receiver do
  json.partial! 'users/user', user: @order.receiver, current_user: @current_user
end
json.start_warehouse do
  json.partial! 'warehouses/warehouse', warehouse: @order.start_warehouse
end
json.end_warehouse do
  json.partial! 'warehouses/warehouse', warehouse: @order.end_warehouse
end

json.delivery_date @order.delivery_date if @order.status_after_or_equal? :awaiting_pickup
