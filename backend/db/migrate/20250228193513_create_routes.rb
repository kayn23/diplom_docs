class CreateRoutes < ActiveRecord::Migration[7.1]
  def change
    create_table :routes do |t|
      t.references :start_warehouse, null: false, foreign_key: { to_table: :warehouses }
      t.references :end_warehouse, null: false, foreign_key: { to_table: :warehouses }
      t.references :user, foreign_key: true
      t.integer :delivery_days, array: true, default: []

      t.timestamps
    end
  end
end
