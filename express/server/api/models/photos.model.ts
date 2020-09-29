import L from '../../common/logger';
import { getRepository } from 'typeorm';
import { PhotosEntity } from '../entities/photos.entity';

export class PhotosModel {
  public async getLastPhotoByMachineId(machinesId: number): Promise<PhotosEntity> {
    L.info('getLastPhotoByMachineId');
    const photosRepository = getRepository(PhotosEntity);

    return photosRepository
      .createQueryBuilder()
      .where('machines_id = :machinesId', { machinesId })
      .orderBy('created', 'DESC')
      .getOne();
  }

  public async addNewPhoto(machinesId: number, title: string): Promise<PhotosEntity> {
    L.info('addNewPhoto');

    const photosRepository = getRepository(PhotosEntity);

    const newPhoto = photosRepository.create({
      machinesId,
      title,
    });

    return await photosRepository.save(newPhoto);
  }
}
