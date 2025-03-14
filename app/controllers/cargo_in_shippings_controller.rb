class CargoInShippingsController < ApplicationController
  before_action :set_cargo_in_shipping
  before_action :set_shipping

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

  def upload
    authorize @cargo_in_shipping

    unless @shipping.delivering?
      return render json: { errors: 'delivery not in delivering status' },
                    status: :unprocessable_entity
    end

    unless @cargo_in_shipping.may_upload?
      return render json: { errors: 'cargo cannot be uploaded' }, status: :unprocessable_entity
    end

    if @cargo_in_shipping.upload!
      # TODO: возможно это надо выкинуть в воркеры,
      # но в тоже время в воркерах может быть проблема конкурентног доступа
      ShippingFinisherService.new(@cargo_in_shipping.shipping.id).call

      OrderDeliveryFinisherService.new(@cargo_in_shipping.cargo.order.id).call
      # тут надо запустить систему для проверки связанной доставки
      # если по доставке все грузы доставлены то закрыть достаку
      # Так же надо запускать проверки для заказов, что если в заказах все грузы доставлены,
      # то надо переводить заказы в статус ожидания выдачи,
      # но только если все грузы доставлены в конечную точку
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
    @cargo_in_shipping = CargoInShipping.find(params[:id])
  end

  def load_params
    params.permit
  end
end
