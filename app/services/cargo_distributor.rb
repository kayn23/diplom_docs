class CargoDistributor
  class CargoTooLargeError < StandardError
    def initialize
      super('active transport vehicle cannot accommodate cargo')
    end
  end

  class NoActiveCarError < StandardError
    def initialize
      super('there is no active vehicle for the route')
    end
  end

  class ValidationError < StandardError
    def initialize
      super('Loads or routes not provided! Contact administrator!')
    end
  end

  def initialize(order)
    @order = order
    @cargos = order.cargos
    @start_route, @end_route = @order.routes
  end

  def distribute
    raise ValidationError if @cargos.empty? || @start_route.nil? || @end_route.nil?

    @cargos.each do |cargo|
      shipping = distribute_cargo(cargo, @start_route, @order.updated_at + 1.day)
      distribute_cargo(cargo, @end_route, shipping.date)
    end
  end

  def distribute_cargo(cargo, route, min_date = nil)
    shipping = find_or_create_shipping(route, cargo.size, min_date)
    return false unless shipping

    shipping.cargo_in_shippings.create(cargo:)

    shipping
  end

  #
  # === Exceptions
  # - CargoTooLargeError
  # - NoActiveCarError
  def find_or_create_shipping(route, size, from_date = nil)
    created_shippings = route.shippings.created_with_cargos
    car = route.user.cars.find_by(active: true)
    raise NoActiveCarError.new if car.nil?
    raise CargoTooLargeError if size > car.capacity

    shipping = created_shippings.find do |s|
      date_condition = from_date.nil? ? true : s.date > from_date
      date_condition && s.can_load_more?(size)
    end

    return shipping if shipping

    last_shipping_date = from_date || route.shippings.maximum(:date) || Date.today
    new_shipping_date = route.nearest_delivery_date last_shipping_date

    # Создать новую доставку
    route.shippings.create!(
      assignee: route.user,
      status: 'created',
      date: new_shipping_date
    )
  end
end
