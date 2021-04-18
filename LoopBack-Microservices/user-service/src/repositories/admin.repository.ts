import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AdminDbDataSource} from '../datasources';
import {Admin, AdminRelations} from '../models';
import * as jwt from 'jsonwebtoken';

export class AdminRepository extends DefaultCrudRepository<
  Admin,
  typeof Admin.prototype.id,
  AdminRelations
> {
  constructor(
    @inject('datasources.adminDB') dataSource: AdminDbDataSource,
  ) {
    super(Admin, dataSource);
  }
  async isUserExist(user:Admin){
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
