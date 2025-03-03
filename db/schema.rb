# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_03_02_084825) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cargo_in_shippings", force: :cascade do |t|
    t.bigint "cargo_id", null: false
    t.bigint "shipping_id", null: false
    t.string "status", default: "wait"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cargo_id"], name: "index_cargo_in_shippings_on_cargo_id"
    t.index ["shipping_id"], name: "index_cargo_in_shippings_on_shipping_id"
  end

  create_table "cargos", force: :cascade do |t|
    t.string "description"
    t.float "size"
    t.float "dimensions"
    t.bigint "order_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "qrcode"
    t.index ["order_id"], name: "index_cargos_on_order_id"
  end

  create_table "cars", force: :cascade do |t|
    t.float "capacity"
    t.float "load_capacity"
    t.string "name"
    t.boolean "active", default: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_cars_on_user_id"
  end

  create_table "cities", force: :cascade do |t|
    t.string "name", null: false
    t.string "region", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "region"], name: "index_cities_on_name_and_region", unique: true
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "sender_id", null: false
    t.bigint "receiver_id"
    t.bigint "start_warehouse_id", null: false
    t.bigint "end_warehouse_id", null: false
    t.string "status", default: "created"
    t.decimal "price", precision: 10, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["end_warehouse_id"], name: "index_orders_on_end_warehouse_id"
    t.index ["receiver_id"], name: "index_orders_on_receiver_id"
    t.index ["sender_id"], name: "index_orders_on_sender_id"
    t.index ["start_warehouse_id"], name: "index_orders_on_start_warehouse_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "roles_users", id: false, force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "role_id", null: false
    t.index ["role_id", "user_id"], name: "index_roles_users_on_role_id_and_user_id", unique: true
    t.index ["user_id", "role_id"], name: "index_roles_users_on_user_id_and_role_id", unique: true
  end

  create_table "routes", force: :cascade do |t|
    t.bigint "start_warehouse_id", null: false
    t.bigint "end_warehouse_id", null: false
    t.bigint "user_id"
    t.integer "delivery_days", default: [], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["end_warehouse_id"], name: "index_routes_on_end_warehouse_id"
    t.index ["start_warehouse_id"], name: "index_routes_on_start_warehouse_id"
    t.index ["user_id"], name: "index_routes_on_user_id"
  end

  create_table "shippings", force: :cascade do |t|
    t.bigint "route_id", null: false
    t.bigint "assignee_id", null: false
    t.string "status", default: "created"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["assignee_id"], name: "index_shippings_on_assignee_id"
    t.index ["route_id"], name: "index_shippings_on_route_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "firstname"
    t.string "surname"
    t.string "lastname"
    t.string "document_number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["document_number"], name: "index_users_on_document_number", unique: true, where: "(document_number IS NOT NULL)"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  create_table "warehouses", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.bigint "city_id", null: false
    t.boolean "active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["city_id"], name: "index_warehouses_on_city_id"
    t.index ["name", "address", "city_id"], name: "index_warehouses_on_name_and_address_and_city_id", unique: true
  end

  add_foreign_key "cargo_in_shippings", "cargos"
  add_foreign_key "cargo_in_shippings", "shippings"
  add_foreign_key "cargos", "orders"
  add_foreign_key "cars", "users"
  add_foreign_key "orders", "users", column: "receiver_id"
  add_foreign_key "orders", "users", column: "sender_id"
  add_foreign_key "orders", "warehouses", column: "end_warehouse_id"
  add_foreign_key "orders", "warehouses", column: "start_warehouse_id"
  add_foreign_key "routes", "users"
  add_foreign_key "routes", "warehouses", column: "end_warehouse_id"
  add_foreign_key "routes", "warehouses", column: "start_warehouse_id"
  add_foreign_key "shippings", "routes"
  add_foreign_key "shippings", "users", column: "assignee_id"
  add_foreign_key "warehouses", "cities"
end
