class CreateShippings < ActiveRecord::Migration[7.1]
  def change
    create_table :shippings do |t|
      t.references :route, null: false, foreign_key: true
      t.references :assignee, null: false, foreign_key: { to_table: :users }
      t.string :status, default: 'created'

      t.timestamps
    end
  end
end
