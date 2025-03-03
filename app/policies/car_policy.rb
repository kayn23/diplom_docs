class CarPolicy < ApplicationPolicy
  def create?
    return user.id == record.user_id if user.courier?
    return true if user.hight_rule?

    false
  end

  def update?
    create?
  end

  def destroy?
    create?
  end
end
