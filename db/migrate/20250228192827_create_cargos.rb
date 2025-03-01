class CreateCargos < ActiveRecord::Migration[7.1]
  def change
    create_table :cargos do |t|
      t.string :description
      t.float :size
      t.float :dimensions
      t.references :order, null: false, foreign_key: { to_table: :orders }

      t.timestamps
    end
  end
end
