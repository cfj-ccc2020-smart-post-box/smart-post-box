import L from '../../common/logger';
import * as line from '@line/bot-sdk';
import { MachinesModel } from '../models/machines.model';
import { MachinesEntity } from '../entities/machines.entity';

export class PostBoxService {
  readonly lineClient: line.Client;
  readonly machinesModel: MachinesModel;

  constructor(ops: { lineClientConfig: line.ClientConfig }) {
    this.lineClient = new line.Client(ops.lineClientConfig);
    this.machinesModel = new MachinesModel();
  }

  public async sendMsgOfNewMail(uniqueCode: string): Promise<void> {
    L.info('sendMsgOfNewMail');

    let machine: MachinesEntity;

    try {
      machine = await this.machinesModel.getMachineByUniqueCode(uniqueCode);
    } catch (err) {
      throw new Error(err);
    }

    if (!machine) {
      return;
    }

    this.lineClient.pushMessage(machine.destinationId, {
      type: 'text',
      text: `【投函通知】ポストへの投函を検知しました。${machine.name === '' ? '' : 'by ' + machine.name}`,
    });
  }
}
