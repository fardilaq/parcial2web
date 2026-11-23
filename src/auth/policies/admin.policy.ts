import { Policy, PolicyBefore, Ability } from '@nestjs/authorization';
import { User } from '../../users/entities/user.entity.js';

@Policy()
export class AdminPolicy implements PolicyBefore<User, Ability<AdminPolicy>> {
  before(user: User | null, ability: Ability<AdminPolicy>) {
    if (user?.roles?.some((r) => r.role_name === 'admin')) {
      return true;
    }
  }

  manage(user: User | null): boolean {
    return false;
  }
}