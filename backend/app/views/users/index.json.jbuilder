json.array! @users do |usr|
  json.partial! "users/user", locals: { user: usr, current_user: @current_user }
end
