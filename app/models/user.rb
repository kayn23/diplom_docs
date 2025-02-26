class User < ApplicationRecord
  has_secure_password
  has_and_belongs_to_many :roles
  has_many :sent_orders, class_name: 'Order', foreign_key: 'sender_id'
  has_many :received_orders, class_name: 'Order', foreign_key: 'receiver_id'

  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }, on: :create
  validates :document_number, uniqueness: true

  after_create :assign_client_role

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

  def admin?
    roles.exists?(name: %w[admin])
  end

  def manager?
    roles.exists?(name: %w[manager])
  end

  def hight_rule?
    roles.exists?(name: %w[manager admin])
  end

  def low_rule?
    !hight_rule?
  end

  def courier?
    roles.exists?(name: %w[courier])
  end

  def auth_token
    JsonWebToken.encode(user_id: id)
  end

  private

  def assign_client_role
    client_role = Role.find_or_create_by(name: 'client')
    roles << client_role
  end
end
