class CreateCars < ActiveRecord::Migration[7.1]
  def change
    create_table :cars do |t|
      t.float :capacity
      t.float :load_capacity
      t.string :name
      t.boolean :active, default: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
