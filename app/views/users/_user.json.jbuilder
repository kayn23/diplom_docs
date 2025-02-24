json.id        user.id
json.email     user.email
json.firstname user.firstname
json.surname   user.surname
json.lastname  user.lastname
json.roles user.roles.pluck(:name)

if current_user&.roles&.exists?(name: 'admin')
  json.document_number @user.document_number
end
