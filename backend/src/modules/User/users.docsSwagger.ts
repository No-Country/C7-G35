import { Body, Delete, Get, Put, Route, Security, SuccessResponse, Tags } from 'tsoa';
import { userUpdate } from './domain/types';
import { User } from './domain/User';

type userUpdateBody = Omit<userUpdate, 'id'>;

@Security('jwt')
@Route('/users')
@Tags('Users')
export class UsersDocsRoutes {
  @SuccessResponse(200, 'Updated')
  @Put('/me')
  static UserPutController(@Body() body: userUpdateBody) {}

  @SuccessResponse(200, 'ok')
  @Get('/me')
  static UserGetController(): User {
    return {} as any;
  }

  @SuccessResponse('200', 'deleted')
  @Delete('/me')
  static UserDeactivateController() {}
}
