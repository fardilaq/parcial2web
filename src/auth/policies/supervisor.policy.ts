import { Policy, PolicyBefore, Ability } from '@nestjs/authorization';
import { User } from '../../users/entities/user.entity.js';

@Policy()
export class SupervisorPolicy implements PolicyBefore<User, Ability<SupervisorPolicy>> {
  before(user: User | null, ability: Ability<SupervisorPolicy>) {
    if (user?.roles?.some((r) => r.role_name === 'supervisor')) {
      return true;
    }
  }

  manage_supervisor(user: User | null): boolean {
    return false;
  }
  
}