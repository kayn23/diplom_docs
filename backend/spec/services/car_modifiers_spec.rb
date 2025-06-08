require 'rails_helper'

RSpec.describe CarModifier do
  let(:user) { create(:user) }
  let(:car) { create(:car, user: user, active: false) }

  describe '#call' do
    context 'когда у пользователя нет активной машины' do
      it 'делает машину активной' do
        car.active = true
        service = described_class.new(user, car)

        expect(service.call).to be_truthy
        expect(car.reload.active).to be_truthy
      end
    end

    context 'когда выбирается активной новая машина' do
      let!(:active_car) { create(:car, user: user, active: true) }

      it 'деактивирует текущую активную машину' do
        car.active = true
        service = described_class.new(user, car)

        expect(service.call).to be_truthy
        expect(active_car.reload.active).to be_falsey
        expect(car.reload.active).to be_truthy
      end
    end

    context 'когда машина неактивна' do
      it 'не изменяет активную машину' do
        car.active = false
        service = described_class.new(user, car)

        expect(service.call).to be_truthy
        expect(car.reload.active).to be_falsey
      end
    end
  end
end
