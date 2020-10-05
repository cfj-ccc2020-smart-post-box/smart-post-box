import L from '../../common/logger';
import * as line from '@line/bot-sdk';
import { MachinesModel } from '../models/machines.model';
import { MachinesEntity } from '../entities/machines.entity';

export class PostBoxService {
  readonly machinesModel: MachinesModel;

  constructor() {
    this.machinesModel = new MachinesModel();
  }

  public async msgOfNewMail(uniqueCode: string): Promise<{ destinationId: string; msg: line.TextMessage }> {
    L.info('msgOfNewMail');

    let machine: MachinesEntity;

    try {
      machine = await this.machinesModel.getMachineByUniqueCode(uniqueCode);
    } catch (err) {
      throw new Error(err);
    }

    if (!machine) {
      throw new Error('invalid unique code.');
    }

    return {
      destinationId: machine.destinationId,
      msg: {
        type: 'text',
        text: `【投函通知】ポストへの投函を検知しました。\n\nfrom\nID: ${machine.uniqueCode}\nName: ${
          machine.name || 'No name'
        }\n同期: ${machine.synced ? `済\nModel: ${machine.modelName}` : '未'}`,
      },
    };
  }

  public async sync(uniqueCode: string, modelName: string): Promise<string> {
    let machine: MachinesEntity;

    try {
      machine = await this.machinesModel.getMachineByUniqueCode(uniqueCode);

      if (!machine) {
        return 'invalid unique code.';
      }
    } catch (err) {
      throw new Error(err);
    }

    let updatedConfig: MachinesEntity;

    try {
      updatedConfig = await this.machinesModel.updateMachineConfig(machine, modelName);
    } catch (err) {
      throw new Error(err);
    }

    return `${updatedConfig.takePhoto ? 1 : 0},${updatedConfig.cron}`;
  }
}
