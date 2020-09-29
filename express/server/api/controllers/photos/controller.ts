import { Controller, Get, Route } from 'tsoa';
import { PhotosService } from '../../services/photos.service';

const photosService = new PhotosService();

@Route('photos')
export class PhotosController extends Controller {
  @Get('/last-title/{uniqueCode}')
  public async getLastPhotoTitleByMachineId(uniqueCode: string): Promise<string> {
    const lastTitle = await photosService.getLastPhotoTitleByMachineId(uniqueCode);
    return lastTitle;
  }
}
