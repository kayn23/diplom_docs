class AddQrcodeToCargo < ActiveRecord::Migration[7.1]
  def change
    add_column :cargos, :qrcode, :string
  end
end
