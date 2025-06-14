class CreateCities < ActiveRecord::Migration[7.1]
  def change
    create_table :cities do |t|
      t.string :name, null: false
      t.string :region, null: false

      t.index %i[name region], unique: true

      t.timestamps
    end
  end
end
