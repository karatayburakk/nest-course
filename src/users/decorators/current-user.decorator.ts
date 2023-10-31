import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    console.log('Current User Decorator Activated');
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
