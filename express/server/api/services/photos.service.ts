import L from '../../common/logger';
import * as line from '@line/bot-sdk';
import { PhotosModel } from '../models/photos.model';
import { PhotosEntity } from '../entities/photos.entity';
import { MachinesModel } from '../models/machines.model';
import { MachinesEntity } from '../entities/machines.entity';
import short from 'short-uuid';
import fs from 'fs';
import path from 'path';
import fileType from 'file-type';

export class PhotosService {
  readonly photosModel: PhotosModel;
  readonly machinesModel: MachinesModel;

  constructor() {
    this.photosModel = new PhotosModel();
    this.machinesModel = new MachinesModel();
  }

  public async getLastPhotoTitleByMachineId(uniqueCode: string): Promise<string> {
    L.info('getLastPhotoTitleByMachineId');

    let machine: MachinesEntity;

    try {
      machine = await this.machinesModel.getMachineByUniqueCode(uniqueCode);
      if (!machine) {
        return 'invalid unique code';
      }
    } catch (err) {
      L.info(err);
      return 'internal server error';
    }

    if (machine.stop) {
      return 'this machine is already stopped.';
    }

    try {
      const photo = await this.photosModel.getLastPhotoByMachineId(machine.id);

      if (!photo) {
        return 'there is not that photo.';
      }

      return photo.title;
    } catch (err) {
      L.info(err);
      return 'internal server error';
    }
  }

  public async msgOfNewPhoto(
    uniqueCode: string,
    photoHost: string,
    photoBase64: string
  ): Promise<{ destinationId: string; msg: line.ImageMessage }> {
    L.info('msgOfNewPhoto');

    let machine: MachinesEntity;
    let photo: PhotosEntity;

    try {
      machine = await this.machinesModel.getMachineByUniqueCode(uniqueCode);
    } catch (err) {
      throw new Error(err);
    }

    if (!machine) {
      throw new Error('invalid unique code.');
    }

    if (machine.stop) {
      throw new Error('this machine is already stopped.');
    }

    const title = short.generate();
    let photoData = Buffer.from(photoBase64, 'base64');
    let photoDataInfo = await fileType.fromBuffer(photoData);

    if (photoDataInfo.ext !== 'jpg' || photoDataInfo.mime !== 'image/jpeg') {
      L.info('plz post jpg.');
      throw new Error('plz post jpg.');
    }

    try {
      fs.writeFileSync(
        path.join(__dirname, '..', '..', '..', '..', 'vue', 'dist', 'img', 'photos', title + '.jpg'),
        photoData
      );
    } catch (err) {
      throw new Error(err);
    }

    photoBase64 = null; // GC
    photoData = null; // GC
    photoDataInfo = null; // GC

    try {
      photo = await this.photosModel.addNewPhoto(machine.id, title);
    } catch (err) {
      throw new Error(err);
    }

    const imgUrl = 'https://' + photoHost.trim() + '/img/photos/' + photo.title + '.jpg';

    return {
      destinationId: machine.destinationId,
      msg: {
        type: 'image',
        originalContentUrl: imgUrl,
        previewImageUrl: imgUrl,
      },
    };
  }
}
