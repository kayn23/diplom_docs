class CreateOrders < ActiveRecord::Migration[7.1]
  def change
    create_table :orders do |t|
      t.references :sender, null: false, foreign_key: { to_table: :users }
      t.references :receiver, foreign_key: { to_table: :users }
      t.references :start_warehouse, null: false, foreign_key: { to_table: :warehouses }
      t.references :end_warehouse, null: false, foreign_key: { to_table: :warehouses }

      t.string :status, default: 'created'
      t.decimal :price, precision: 10, scale: 2

      t.timestamps
    end
  end
end
