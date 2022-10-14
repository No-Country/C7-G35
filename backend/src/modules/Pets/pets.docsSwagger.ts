import { Body, Delete, Get, Path, Post, Put, Route, Security, SuccessResponse, Tags } from 'tsoa';
import { Pet } from './Pet';
import { newPet, updatePet } from './types';

type newPetBody = Omit<newPet, 'owner'>;
type updatePetBody = Omit<updatePet, 'id' | 'owner'>;

@Security('jwt')
@Route('/pets')
@Tags('Pets')
export class PetsDocsRoutes {
  @SuccessResponse('201', 'Created')
  @Post()
  static PetPostController(@Body() body: newPetBody): Pet {
    return {} as any;
  }

  @SuccessResponse('200', 'Updated')
  @Put('/{id}')
  static PetPutController(@Body() body: updatePetBody, @Path() id: string) {}

  @SuccessResponse('200', 'ok')
  @Post('/{id}/images')
  static PetsImagePostController(
    @Path() id: string,
    @Body() image: { imageUrl: string }
  ): { Pet: Pet; imageUrl: string } {
    return {} as any;
  }

  /**
   * get pets from an authenticated user
   */
  @Get()
  static PetsGetController(): Pet[] {
    return [];
  }

  @SuccessResponse('200', 'deleted')
  @Delete('/{id}')
  static PetDeleteController(@Path() id: string) {}
}
