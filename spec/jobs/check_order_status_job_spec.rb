require 'rails_helper'

RSpec.describe CheckOrderStatusJob, type: :job do
  let(:order) { create(:order, status: 'created') }

  before do
    Sidekiq::Testing.fake!
  end

  after do
    Sidekiq::Worker.clear_all
  end

  describe '#perform_in' do
    it 'enqueues the job with a 72-hour delay' do
      expect do
        CheckOrderStatusJob.perform_in(72.hours, order.id)
      end.to change(CheckOrderStatusJob.jobs, :size).by(2) # Проверяем, что job добавлен в очередь

      job = CheckOrderStatusJob.jobs.last
      expect(job['args']).to eq([order.id]) # Проверяем аргументы job
      expect(job['at']).to be_within(1.second).of(72.hours.from_now.to_f) # Проверяем задержку
    end
  end

  describe '#perform' do
    context 'when the order exists and can be canceled' do
      it 'deletes the order' do
        allow(order).to receive(:may_cancel?).and_return(true) # Заказ может быть отменен
        CheckOrderStatusJob.new.perform(order.id)

        expect { order.reload }.to raise_error(ActiveRecord::RecordNotFound) # Проверяем, что заказ удален
      end
    end

    context 'when the order exists but cannot be canceled' do
      it 'does not delete the order' do
        order.update(status: 'paid')
        allow(order).to receive(:may_cancel?).and_return(false) # Заказ не может быть отменен
        CheckOrderStatusJob.new.perform(order.id)

        expect(order.reload).to be_present # Проверяем, что заказ не удален
      end
    end

    context 'when the order does not exist' do
      it 'does nothing' do
        non_existent_order_id = 999_999
        expect { CheckOrderStatusJob.new.perform(non_existent_order_id) }.not_to raise_error # Проверяем, что ошибки нет
      end
    end
  end
end
