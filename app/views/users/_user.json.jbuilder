json.id        user.id
json.email     user.email
json.firstname user.firstname
json.surname   user.surname
json.lastname  user.lastname
json.roles     user.roles.pluck(:name)

json.document_number user.document_number if current_user&.high_rule? || current_user&.id == user.id
