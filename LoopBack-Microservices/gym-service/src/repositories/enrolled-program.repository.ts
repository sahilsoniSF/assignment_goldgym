import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {EnrolledProgramDataSource} from '../datasources';
import {EnrolledProgram, EnrolledProgramRelations} from '../models';

export class EnrolledProgramRepository extends DefaultCrudRepository<
  EnrolledProgram,
  typeof EnrolledProgram.prototype.id,
  EnrolledProgramRelations
> {
  constructor(
    @inject('datasources.enrolledProgram') dataSource: EnrolledProgramDataSource,
  ) {
    super(EnrolledProgram, dataSource);
  }

  async getArrayByUsername(username:string)
  {
    const result=await this.find({
      where:{
        username:username
      }
    });
      return result;
  }
}
