import L from '../../common/logger';
import { getRepository } from 'typeorm';
import { PhotosEntity } from '../entities/photos.entity';

export class PhotosModel {
  public async getLastPhotoByMachineId(machinesId: number): Promise<PhotosEntity> {
    L.log('getLastPhotoByMachineId');
    const photosRepository = getRepository(PhotosEntity);

    return photosRepository
      .createQueryBuilder()
      .from(PhotosEntity, 'photos')
      .where('machines_id = :machinesId', { machinesId })
      .orderBy('created', 'DESC')
      .getOne();
  }

  public async addNewPhoto(machinesId: number, title: string): Promise<PhotosEntity> {
    L.log('addNewPhoto');
    const photosRepository = getRepository(PhotosEntity);

    const newPhoto = photosRepository.create({
      machinesId,
      title,
    });

    const photo = await photosRepository.save(newPhoto);
    return photo;
  }
}
