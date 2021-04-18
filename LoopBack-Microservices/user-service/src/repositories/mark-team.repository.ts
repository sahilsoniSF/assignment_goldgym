import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MarkTeamDbDataSource} from '../datasources';
import {MarkTeam, MarkTeamRelations} from '../models';

import * as jwt from 'jsonwebtoken';

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
  async isUserExist(user:MarkTeam){
    const checkedUser=await this.find({
      where:{
        name:user.name
      }
    });
    return checkedUser;
  }

  async verifyToken(token:any)
  {
    return jwt.verify(token,"soni-key");
  }
}
