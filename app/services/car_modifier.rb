class CarModifier
  class InvalidOperationError < StandardError; end

  def initialize(user, car)
    @user = user
    @car = car
  end

  def call
    @car.user = @user
    active_car = @user.cars.find_by(active: true)
    unless @car.active && active_car
      @car.errors.add(:base,
                      'Невозможно сделать машину неактивной, так как должна быть одна активная машина')
    end

    active_car.update(active: false) if active_car
    @car.save
  end
end
