json.array! @users do |usr|
  json.partial! "users/user", locals: { user: usr }
end
