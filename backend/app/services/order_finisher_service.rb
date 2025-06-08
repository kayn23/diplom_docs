class OrderFinisherService
  class OrderCannatCompleteError < StandardError
    def initialize
      super 'order cannat copmlete'
    end
  end

  attr_accessor :order

  def initialize(order_id)
    @order = Order.eager_load(:cargos).find(order_id)
  end

  def call
    raise OrderCannatCompleteError unless order.may_complete?

    return unless order.cargos.all? { |item| item.issued? }

    order.complete!
    # TODO: тут надо выдавать оповещение
  end
end
