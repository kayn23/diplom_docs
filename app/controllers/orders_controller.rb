class OrdersController < ApplicationController
  before_action :set_order, only: %i[show update destroy]

  def index
    @orders = policy_scope(Order)
  end

  def show
  end

  def create
  end

  def update
  end

  def destroy
  end

  private

  def set_order
    @order = Order.find(params[:id])
  end
end
