require 'rails_helper'

RSpec.describe CheckOrderStatusJob, type: :job do
  let(:order) { create(:order, status: 'created') }

  before do
    Sidekiq::Testing.fake!
  end

  after do
    Sidekiq::Worker.clear_all
  end

  it 'enqueues the job with a 72-hour delay' do
    expect do
      CheckOrderStatusJob.perform_in(72.hours, order.id)
    end.to change(CheckOrderStatusJob.jobs, :size).by(2)

    job = CheckOrderStatusJob.jobs.last
    expect(job['args']).to eq([order.id])
    expect(job['at']).to be_within(1.second).of(72.hours.from_now.to_f)
  end

  it "updates the order status to 'canceled' if it is still 'created'" do
    CheckOrderStatusJob.new.perform(order.id)
    expect(order.reload.status).to eq('canceled')
  end

  it('order status not change to canceled if order will be take in process') do
    order.update(status: 'paid')
    CheckOrderStatusJob.new.perform(order.id)
    expect(order.reload.status).not_to eq('canceled')
  end
end
