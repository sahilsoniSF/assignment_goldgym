import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProgramDbDataSource} from '../datasources';
import {Programs, ProgramsRelations} from '../models';

export class ProgramsRepository extends DefaultCrudRepository<
  Programs,
  typeof Programs.prototype.id,
  ProgramsRelations
> {
  constructor(
    @inject('datasources.programDB') dataSource: ProgramDbDataSource,
  ) {
    super(Programs, dataSource);
  }
}
