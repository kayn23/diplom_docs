class UserPolicy < ApplicationPolicy
  def show?
    user.roles.exists?(name: %w[admin manager]) || user == record
  end

  def update?
    user.roles.exists?(name: %w[admin manager]) || user == record
  end

  def add_roler?
    user.roles.exists?(name: %w[admin])
  end

  def remove_roles?
    user.roles.exists?(name: %w[admin])
  end
end
