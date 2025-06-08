class CreateRoles < ActiveRecord::Migration[7.1]
  def change
    create_table :roles do |t|
      t.string :name, null: false

      t.timestamps
    end

    # Добавляем данные в таблицу после её создания
    reversible do |dir|
      dir.up do
        roles = %w[client manager courier admin]
        roles.each do |role_name|
          # Используем execute для вставки данных без зависимости от модели
          execute <<-SQL
            INSERT INTO roles (name, created_at, updated_at)
            VALUES ('#{role_name}', NOW(), NOW())
          SQL
        end
      end

      dir.down do
        roles = %w[client manager courier admin]
        roles.each do |role_name|
          execute <<-SQL
            DELETE FROM roles WHERE name = '#{role_name}'
          SQL
        end
      end
    end
  end
end
