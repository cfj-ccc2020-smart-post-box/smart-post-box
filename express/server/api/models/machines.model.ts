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

  public async getMachinesByUsersLineId(usersLinesId: number): Promise<MachinesEntity[]> {
    L.info('getMachinesByUsersLineId');

    const machineRepository = getRepository(MachinesEntity);

    const machines = await machineRepository.find({ usersLinesId, using: true });

    return machines;
  }

  public async isOwnerOfThisMachine(usersLinesId: number, uniqueCode: string): Promise<boolean> {
    L.info('isOwnerOfThisMachine');

    const machineRepository = getRepository(MachinesEntity);

    const machine = await machineRepository.findOne({ usersLinesId, uniqueCode, using: true });

    return machine !== undefined;
  }

  public async stopMachine(uniqueCode: string): Promise<void> {
    L.info('stopMachine');

    const machineRepository = getRepository(MachinesEntity);

    const machine = await machineRepository.findOne({ uniqueCode, using: true });
    machine.stop = true;

    await machineRepository.save(machine);
  }

  public async updateMachineConfig(machine: MachinesEntity, modelName: string): Promise<MachinesEntity> {
    L.info('updateMachineConfig');

    const machinesRepository = getRepository(MachinesEntity);
    machine.modelName = modelName;
    const result = await machinesRepository.save(machine);

    return result;
  }
}
