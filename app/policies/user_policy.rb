class UserPolicy < ApplicationPolicy
  def index?
    show?
  end

  def show?
    return user.id == record.id if user.low_rule?

    user.roles.exists?(name: %w[admin manager]) || user == record
  end

  def create?
    user.roles.exists?(name: %w[admin manager]) || user == record
  end

  def update?
    user.roles.exists?(name: %w[admin manager]) || user == record
  end

  def add_roles?
    user.roles.exists?(name: %w[admin])
  end

  def remove_roles?
    user.roles.exists?(name: %w[admin])
  end
end
