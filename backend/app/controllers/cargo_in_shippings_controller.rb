class CargoInShippingsController < ApplicationController
  before_action :set_cargo_in_shipping, except: %i[index]
  before_action :set_shipping

  def index
    @cargo_in_shippings = policy_scope(CargoInShipping).where(shipping_id: @shipping.id)
  end

  def load
    authorize @shipping, :start_delivery?
    unless @shipping.loading?
      return render json: { errors: 'delivery not in loading status' },
                    status: :unprocessable_entity
    end

    unless @cargo_in_shipping.may_load?
      return render json: { errors: 'cargo cannot be loaded' },
                    status: :unprocessable_entity
    end

    if @cargo_in_shipping.load!
      render 'show'
    else
      render json: { errors: @cargo_in_shipping.errors }, status: :unprocessable_entity
    end
  end

  private

  def set_shipping
    @shipping = Shipping.find(params[:shipping_id])
  end

  def set_cargo_in_shipping
    # @cargo_in_shipping = CargoInShipping.find(params[:id])
    @cargo_in_shipping = CargoInShipping.find_by(shipping_id: params[:shipping_id], cargo_id: params[:id])
  end
end
