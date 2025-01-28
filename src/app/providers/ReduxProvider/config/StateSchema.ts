import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { AuthSchema } from 'features/LoginModal';

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  auth: AuthSchema;
}
