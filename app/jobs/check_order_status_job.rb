class CheckOrderStatusJob < ApplicationJob
  queue_as :default

  def perform(order_id)
    order = Order.find_by(id: order_id)
    nil unless order
    # Do something later
  end
end
