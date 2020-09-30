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

    return machine !== null;
  }

  public async stopMachine(uniqueCode: string): Promise<void> {
    L.info('stopMachine');

    const machineRepository = getRepository(MachinesEntity);

    const machine = await machineRepository.findOne({ uniqueCode, using: true });
    machine.using = false;

    await machineRepository.save(machine);
  }
}