import { Get, Route, SuccessResponse, Tags } from 'tsoa';

@Route('/auth')
@Tags('Auth')
export class AuthDocsRoutes {
  /**
   * Redirect to auht whit google
   */
  @SuccessResponse('200', 'Redirect /home')
  @Get('/google')
  static auhtGoogleController() {}
  /**
   * Redirect to auht whit Facebook
   */
  @SuccessResponse('200', 'Redirect /home')
  @Get('/facebook')
  static auhtFacebookController() {}
}
