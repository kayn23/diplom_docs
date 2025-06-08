class AddStatusInCargo < ActiveRecord::Migration[7.1]
  def change
    add_column :cargos, :status, :string, default: 'accepted'
  end
end
