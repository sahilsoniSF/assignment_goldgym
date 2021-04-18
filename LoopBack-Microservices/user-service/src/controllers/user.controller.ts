import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Request, RestBindings} from '@loopback/rest';
import {inject} from '@loopback/core';
import {Users} from '../models';
import {UsersRepository} from '../repositories';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {error} from 'console';

export class UserController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
    @inject(RestBindings.Http.REQUEST)
    private request: Request,
  ) {}

  // SignUp

  @post('/customer/signup')
  @response(200, {
    description: 'User Model instance',
  })
  async signup(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<Users, 'id'>,
  ): Promise<Users | String> {
    const checkedUser = await this.usersRepository.isUserExist(user);
    if (checkedUser.length) {
      return 'User Already Exist';
    } else {
      user.password = bcrypt.hashSync(user.password, 8);
      return this.usersRepository.create(user);
    }
  }

  // Login
  @post('/customer/login')
  @response(200, {
    description: 'User Login',
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<Users, 'id'>,
  ): Promise< Object | String> {
    const isUserExist = await this.usersRepository.isUserExist(user);
    if (isUserExist.length) {
      const isPassValid = bcrypt.compareSync(
        user.password,
        isUserExist[0].password,
      );
      if (isPassValid) {
        let token = jwt.sign({id: user.name}, 'soni-key', {expiresIn: 84600});
        return {token:token,id:isUserExist[0].id};
      }
      return 'Password is Invalid';
    } else {
      return 'Invalid User';
    }
  }


  // Token Verify

  @post('/customer/verify')
  @response(200,{
    description:"Token Verification"
  })
  async verify()
  :Promise<Object |String>
  {
    const header=this.request.headers;
    try{
      await this.usersRepository.verifyToken(header.authorization);
    }
    catch(err)
    {
      return {verified: false,error:err};
    }
    return {verified : true};
  }



  // For Practice

  // @post('/soni')
  // @response(200)
  // async create1(
  //   @requestBody()
  //   data:any,
  // ): Promise<String> {
  //   console.log(data);
  //   const headers = {...this.request.headers};
  //   console.log(headers);
  //   console.log(this.request.body);

  //   // return this.todoRepository.create(todo);
  //   return "Hii";
  // }

  // @post('/soni')
  // @response(200)
  // async func2(
  //   @inject(RestBindings.Http.REQUEST)
  //   request: Request,
  // ):Promise<String>
  // {
  //   // const  url= this.request.url,
  //   // const headers = {...this.request.headers};
  //   // console.log(url,headers);
  //   return "hii";
  // }

  // //  Custom routes
  //   @post('/soni')
  //   @response(200)
  //   async func1(
  //     @requestBody({
  //       content: {
  //         'application/json':{}
  //       },
  //     })
  //     data:any
  //   ):Promise<String>{
  //     console.log(data);
  //     return "Hi soni"
  //   }

  // Default routes

  @post('/users')
  @response(200, {
    description: 'Users model instance',
    content: {'application/json': {schema: getModelSchemaRef(Users)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {
            title: 'NewUsers',
            exclude: ['id'],
          }),
        },
      },
    })
    users: Omit<Users, 'id'>,
  ): Promise<Users> {
    return this.usersRepository.create(users);
  }

  @get('/users/count')
  @response(200, {
    description: 'Users model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Users) where?: Where<Users>): Promise<Count> {
    return this.usersRepository.count(where);
  }

  @get('/users')
  @response(200, {
    description: 'Array of Users model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Users, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Users) filter?: Filter<Users>): Promise<Users[]> {
    return this.usersRepository.find(filter);
  }

  @patch('/users')
  @response(200, {
    description: 'Users PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {partial: true}),
        },
      },
    })
    users: Users,
    @param.where(Users) where?: Where<Users>,
  ): Promise<Count> {
    return this.usersRepository.updateAll(users, where);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'Users model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Users, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Users, {exclude: 'where'})
    filter?: FilterExcludingWhere<Users>,
  ): Promise<Users> {
    return this.usersRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'Users PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {partial: true}),
        },
      },
    })
    users: Users,
  ): Promise<void> {
    await this.usersRepository.updateById(id, users);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'Users PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() users: Users,
  ): Promise<void> {
    await this.usersRepository.replaceById(id, users);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'Users DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usersRepository.deleteById(id);
  }
}
