json.extract! shipping, :id, :route_id, :assignee_id, :status, :date
json.assignee do
  json.partial! 'users/user', user: shipping.assignee, current_user: current_user
end

json.route { json.partial! 'routes/route_details', route: shipping.route }
