class CreateUsers < ActiveRecord::Migration[7.1]
  create_table :users do |t|
    t.string :email, null: false
    t.string :password_digest, null: false
    t.string :firstname
    t.string :surname
    t.string :lastname
    t.string :document_number

    t.timestamps
  end
  add_index :users, :email, unique: true
  add_index :users, :document_number, unique: true
end
