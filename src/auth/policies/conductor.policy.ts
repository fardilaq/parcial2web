import { Policy, PolicyBefore, Ability } from '@nestjs/authorization';
import { User } from '../../users/entities/user.entity.js';

@Policy()
export class ConductorPolicy implements PolicyBefore<User, Ability<ConductorPolicy>> {
  before(user: User | null, ability: Ability<ConductorPolicy>) {
    if (user?.roles?.some((r) => r.role_name === 'conductor')) {
      return true;
    }
  }

  manage_conductor(user: User | null): boolean {
    return false;
  }
  
}