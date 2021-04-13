import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UserDbDataSource} from '../datasources';
import {Users, UsersRelations} from '../models';
import * as jwt from 'jsonwebtoken';



export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {
  constructor(
    @inject('datasources.userDB') dataSource: UserDbDataSource,
  ) {
    super(Users, dataSource);
  }

  async isUserExist(user:Users){
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
