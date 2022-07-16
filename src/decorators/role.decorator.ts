import { SetMetadata } from '@nestjs/common';

export const Role = (role: string | string[]) => {
  return SetMetadata('role',role)
};