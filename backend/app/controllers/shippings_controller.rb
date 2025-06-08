class ShippingsController < ApplicationController
  before_action :set_shipping, except: %i[index]

  def index
    authorize Shipping
    @shippings = policy_scope(Shipping)
                 .ransack(params[:q])
                 .result
                 .page(params[:page])
  end

  def show
    authorize @shipping

    render 'show', status: :ok
  end

  def start_load
    authorize @shipping

    unless @shipping.may_start_load?
      return render json: { errors: 'delivery not available for download' },
                    status: :unprocessable_entity
    end

    @shipping.start_load

    @shipping.assignee = current_user if current_user != @shipping.assignee && current_user.courier?

    if @shipping.save
      render 'show'
    else
      render json: { errors: @shipping.errors }, status: :unprocessable_entity
    end
  end

  def start_delivery
    authorize @shipping

    unless @shipping.may_start_delivery?
      return render json: { errors: 'delivery not available for start' },
                    status: :unprocessable_entity
    end

    ActiveRecord::Base.transaction do
      if @shipping.start_delivery!
        render 'show'
      else
        render json: { errors: @shipping.errors }, status: :unprocessable_entity
        raise ActiveRecord::Rollback
      end
    rescue Shipping::NotAllCargoLoaded => e
      render json: { errors: e }, status: :unprocessable_entity
      raise ActiveRecord::Rollback
    end
  end

  private

  def set_shipping
    @shipping = Shipping.eager_load(:route, :assignee, :cargo_in_shippings).find(params[:id])
  end
end
