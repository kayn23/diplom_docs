class CheckOrderStatusJob
  include Sidekiq::Job

  def perform(order_id)
    order = Order.find_by(id: order_id)
    return unless order

    return unless order.may_cancel?

    order.cancel!

    # Do something later
  end
end
