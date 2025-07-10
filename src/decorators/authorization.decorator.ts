import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/guards/jwt-auth.guard';

export function Authorization() {
  return applyDecorators(UseGuards(JwtGuard));
}
