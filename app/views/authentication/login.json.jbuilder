json.user { json.partial! 'users/user', user: @user, current_user: nil }

json.token @token

