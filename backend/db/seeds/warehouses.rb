city_vladimir = City.find_by(name: 'Владимир')

Warehouse.find_or_create_by!(
  name: 'РЦ',
  address: 'Заводская 2д',
  city: city_vladimir
)
