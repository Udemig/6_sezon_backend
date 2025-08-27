import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Custom Decorator
export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    // yapılan api isteğine erişmek için request nesnesini al
    const request = ctx.switchToHttp().getRequest();

    // user nesnesini döndür
    return data ? request.user[data] : request.user;
  },
);
