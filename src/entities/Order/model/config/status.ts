export const statuses = ['created', 'wait_payment', 'paid', 'in_delivery', 'awaiting_pickup', 'completed'] as const;
export type status = (typeof statuses)[number];
