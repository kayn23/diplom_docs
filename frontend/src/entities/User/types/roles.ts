export const roles = ['client', 'manager', 'courier', 'admin'] as const;
export type Roles = (typeof roles)[number];
