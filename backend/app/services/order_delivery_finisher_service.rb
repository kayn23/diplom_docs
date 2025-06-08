class OrderDeliveryFinisherService
  class OrderCannotStockReceivedError < StandardError
    def initialize
      super 'order cannat stack received'
    end
  end

  attr_accessor :order

  def initialize(order_id)
    @order = Order.eager_load(:cargos).find(order_id)
  end

  def call
    raise OrderCannotStockReceivedError unless order.may_stock_received?

    cargo_in_shippings = CargoInShipping
                         .joins(cargo: :order) # Соединяем cargo_in_shippings с cargo и order
                         .joins(shipping: :route) # Соединяем cargo_in_shippings с shipping и route
                         .where(orders: { id: order.id }) # Фильтруем по заказу
                         .where(routes: { end_warehouse_id: order.end_warehouse_id })

    return if cargo_in_shippings.count != order.cargos.count

    return unless cargo_in_shippings.all? { |item| item.delivered? }

    order.stock_received!
    # TODO: тут надо добавить вызов на оповещение
  end
end
