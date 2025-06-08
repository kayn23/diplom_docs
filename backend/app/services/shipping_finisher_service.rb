class ShippingFinisherService
  class ShippingCantFinishError < StandardError
    def initialize
      super 'shipping cannot finish'
    end
  end

  attr_accessor :shipping

  def initialize(shipping_id)
    @shipping = Shipping.eager_load(:cargo_in_shippings).find(shipping_id)
  end

  def call
    raise ShippingCantFinishError unless shipping.may_finish?

    return unless shipping.cargo_in_shippings.all? do |item|
      item.delivered?
    end

    shipping.finish!
    # TODO: тут надо довать вызов оповещения
  end
end
