Kaminari.configure do |config|
  config.default_per_page = 30 # по умолчанию 15 элементов на страницу
  config.max_per_page = 100 # максимальное количество элементов на странице
end
