import { Body, Get, Path, Post, Put, Route, Security, SuccessResponse, Tags } from 'tsoa';
import { Loss } from './Loss';
import { newPetLoss, updatePetLoss } from './types';

type newPetLossRequest = Omit<newPetLoss, 'userId'>;
type updatePetLossRequest = Omit<updatePetLoss, 'userId' | 'id'>;

@Route('/loss')
@Tags('Loss')
export class PetsDocsRoutes {
  /**
   * get last 3 lost pets
   */
  @SuccessResponse('200', 'OK')
  @Get('/last')
  static Controller(): Loss[] {
    return [];
  }

  @Security('jwt')
  @SuccessResponse('201', 'Created')
  @Post()
  static LossPostController(@Body() body: newPetLossRequest): Loss {
    return {} as any;
  }
  @Security('jwt')
  @SuccessResponse('200', 'Updated')
  @Put('/{id}')
  static LossPutController(@Body() body: updatePetLossRequest, @Path() id: string) {}

  /**
   * get pets loss from an authenticated user
   */
  @Security('jwt')
  @Get()
  static LossByUserGetController(): Loss[] {
    return [];
  }
}
