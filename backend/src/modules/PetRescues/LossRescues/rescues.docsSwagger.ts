import { Body, Get, Path, Post, Put, Query, Route, Security, SuccessResponse, Tags } from 'tsoa';
import { Rescue } from './Rescue';
import { newPetRescue, updatePetRescue } from './types';

type newPetRescuesRequest = Omit<newPetRescue, 'userId'>;
type updatePetRescueRequest = Omit<updatePetRescue, 'userId' | 'id'>;

@Route('/rescues')
@Tags('Rescues')
export class PetsDocsRoutes {
  /**
   * get last 3 recues pets
   */
  @SuccessResponse('200', 'OK')
  @Get('/last')
  static LastGetController(): Rescue[] {
    return [];
  }

  /**
   * get rescues by Filters
   */
  @SuccessResponse('200', 'OK')
  @Get('/by')
  static RecuesByFiltersGetController(
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
  ): Rescue[] {
    return [];
  }

  @SuccessResponse('200', 'OK')
  @Get('/{id}')
  static RescueGetController(@Path() id: string): Rescue {
    return {} as any;
  }

  @Security('jwt')
  @SuccessResponse('201', 'Created')
  @Post()
  static RescuePostController(@Body() body: newPetRescuesRequest): Rescue {
    return {} as any;
  }
  @Security('jwt')
  @SuccessResponse('200', 'Updated')
  @Put('/{id}')
  static RescuePutController(@Body() body: updatePetRescueRequest, @Path() id: string) {}

  /**
   * get pets loss from an authenticated user
   */
  @Security('jwt')
  @Get()
  static RescueByUserGetController(): Rescue[] {
    return [];
  }
}
