class AddDateInShipping < ActiveRecord::Migration[7.1]
  def change
    add_column :shippings, :date, :timestamp
  end
end
