import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MarkTeamDbDataSource} from '../datasources';
import {MarkTeam, MarkTeamRelations} from '../models';

export class MarkTeamRepository extends DefaultCrudRepository<
  MarkTeam,
  typeof MarkTeam.prototype.id,
  MarkTeamRelations
> {
  constructor(
    @inject('datasources.markTeamDB') dataSource: MarkTeamDbDataSource,
  ) {
    super(MarkTeam, dataSource);
  }
}
