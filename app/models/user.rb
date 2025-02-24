class User < ApplicationRecord
  has_secure_password
  has_and_belongs_to_many :roles

  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }, on: :create
  validates :document_number, uniqueness: true

  def add_roles(role_names)
    roles = Role.where(name: role_names)
    rn = roles.reject { |role| self.roles.include?(role) }
    # Добавляем роли в ассоциацию, избегая дублирования
    self.roles << rn
  end

  def remove_roles(role_names)
    roles = self.roles.where(name: role_names)
    self.roles.delete(roles)
  end
end
