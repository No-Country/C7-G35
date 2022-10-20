import { Body, Get, Path, Post, Put, Query, Route, Security, SuccessResponse, Tags } from 'tsoa';
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
  static LastGetController(): Loss[] {
    return [];
  }

  /**
   * get loss by Filters
   */
  @SuccessResponse('200', 'OK')
  @Get('/by')
  static LossByFiltersGetController(
    @Query() location?: string,
    @Query() date?: Date,
    @Query() page?: number,
    @Query() gender?: string,
    @Query() type?: string,
    @Query() size?: string,
    @Query() breed?: string,
    @Query() age?: string,
    @Query() isCastrated?: boolean,
    @Query() color?: string[]
  ): Loss[] {
    return [];
  }

  @SuccessResponse('200', 'OK')
  @Get('/{id}')
  static LossGetController(@Path() id: string): Loss {
    return {} as any;
  }

  @Security('jwt')
  @SuccessResponse('201', 'Created')
  @Post()
  static LossPostController(@Body() body: newPetLossRequest): Loss {
    return {} as any;
  }

  @Security('jwt')
  @SuccessResponse('201', 'Created')
  @Post('/{petId}')
  static LossFromPetPostController(@Body() body: Omit<newPetLoss, 'pet' | 'userId'>): Loss {
    return {} as any;
  }

  @Security('jwt')
  @SuccessResponse('200', 'Updated')
  @Put('/{id}')
  static LossPutController(@Body() body: updatePetLossRequest, @Path() id: string) {}

  @Security('jwt')
  @SuccessResponse('200', 'Updated')
  @Put('/{id}/recovered')
  static LossIsRecoveredPutController(@Path() id: string) {}

  /**
   * get pets loss from an authenticated user
   */
  @Security('jwt')
  @Get()
  static LossByUserGetController(): Loss[] {
    return [];
  }
}
