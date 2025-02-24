class CreateWarehouses < ActiveRecord::Migration[7.1]
  def change
    create_table :warehouses do |t|
      t.string :name
      t.string :address
      t.references :city, null: false, foreign_key: true
      t.boolean :active, default: true

      t.timestamps
    end

    add_index :warehouses, %i[name address city_id], unique: true
  end
end
