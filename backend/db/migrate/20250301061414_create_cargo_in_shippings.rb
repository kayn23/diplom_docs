class CreateCargoInShippings < ActiveRecord::Migration[7.1]
  def change
    create_table :cargo_in_shippings do |t|
      t.references :cargo, null: false, foreign_key: { to_table: :cargos }
      t.references :shipping, null: false, foreign_key: { to_table: :shippings }
      t.string :status, default: 'wait'

      t.timestamps
    end
  end
end
