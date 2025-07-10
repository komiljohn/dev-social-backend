import { createParamDecorator } from '@nestjs/common';
import type { Request } from 'express';
import { User } from 'src/modules/user/entities/user.entity';

export const AutorizedUser = createParamDecorator((data: keyof User, ctx) => {
  const request = ctx.switchToHttp().getRequest() as Request & { user: User };

  const user = request.user;

  return data ? user[data] : user;
});
