import L from '../../common/logger';
import { getRepository } from 'typeorm';
import { MachinesEntity } from '../entities/machines.entity';
import short from 'short-uuid';

export class MachinesModel {
  public async addNewMachine(ops: {
    usersLinesId: number;
    destinationType: string;
    destinationId: string;
  }): Promise<MachinesEntity> {
    L.info('addNewMachine');

    const machineRepository = getRepository(MachinesEntity);

    const newMachine = await machineRepository.create({
      usersLinesId: ops.usersLinesId,
      destinationType: ops.destinationType,
      destinationId: ops.destinationId,
      uniqueCode: short.generate(),
    });

    const machine = machineRepository.save(newMachine);

    return machine;
  }

  public async getMachineByUniqueCode(uniqueCode: string): Promise<MachinesEntity> {
    L.info('getMachineByUniqueCode');

    const machineRepository = getRepository(MachinesEntity);

    const machine = await machineRepository.findOne({ uniqueCode, using: true });

    return machine;
  }
}
