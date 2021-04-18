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
import {EnrolledProgram} from '../models';
import {EnrolledProgramRepository} from '../repositories';

export class EnrolledProgramController {
  constructor(
    @repository(EnrolledProgramRepository)
    public enrolledProgramRepository: EnrolledProgramRepository,
    @inject(RestBindings.Http.REQUEST)
    private request: Request,
  ) {}

  // Custom Routes

  @post('/enrolledProgramsByUsername')
  @response(200, {
    description: 'Enrolled Array by username',
  })
  async getArrayByUname(
    @requestBody()
    username: any,
  ): Promise<Object | String> {
    const ArrayOfEnrolledProgramsByUser = 
      await this.enrolledProgramRepository.getArrayByUsername(username.username);
    return ArrayOfEnrolledProgramsByUser;
  }

  @post('/enrolledProgram/delete')
  @response(200,{
    description:'Deleting Enroll Program'
  })
  async disEnroll(
    @requestBody()
    data:Object
  ):Promise<Object>{
    await this.enrolledProgramRepository.deleteEnrolledProgram(data)
    return {message:"Deleted Enrolled Program !!"}
  }


  // Default

  @post('/enrolled-programs')
  @response(200, {
    description: 'EnrolledProgram model instance',
    content: {'application/json': {schema: getModelSchemaRef(EnrolledProgram)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnrolledProgram, {
            title: 'NewEnrolledProgram',
            exclude: ['id'],
          }),
        },
      },
    })
    enrolledProgram: Omit<EnrolledProgram, 'id'>,
  ): Promise<EnrolledProgram | Object> {
    const checkingDuplicate=await this.enrolledProgramRepository.find({
      where:{
        username:enrolledProgram.username,
        programId:enrolledProgram.programId
      }
    });
    if(checkingDuplicate.length>0)
      return {message:"Duplicate Entry"};
    else 
      return this.enrolledProgramRepository.create(enrolledProgram);

  }


  // Not using from UI ---------------------
  @get('/enrolled-programs/count')
  @response(200, {
    description: 'EnrolledProgram model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EnrolledProgram) where?: Where<EnrolledProgram>,
  ): Promise<Count> {
    return this.enrolledProgramRepository.count(where);
  }

  @get('/enrolled-programs')
  @response(200, {
    description: 'Array of EnrolledProgram model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EnrolledProgram, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EnrolledProgram) filter?: Filter<EnrolledProgram>,
  ): Promise<EnrolledProgram[]> {
    return this.enrolledProgramRepository.find(filter);
  }

  @patch('/enrolled-programs')
  @response(200, {
    description: 'EnrolledProgram PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnrolledProgram, {partial: true}),
        },
      },
    })
    enrolledProgram: EnrolledProgram,
    @param.where(EnrolledProgram) where?: Where<EnrolledProgram>,
  ): Promise<Count> {
    return this.enrolledProgramRepository.updateAll(enrolledProgram, where);
  }

  @get('/enrolled-programs/{id}')
  @response(200, {
    description: 'EnrolledProgram model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EnrolledProgram, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EnrolledProgram, {exclude: 'where'})
    filter?: FilterExcludingWhere<EnrolledProgram>,
  ): Promise<EnrolledProgram> {
    return this.enrolledProgramRepository.findById(id, filter);
  }

  @patch('/enrolled-programs/{id}')
  @response(204, {
    description: 'EnrolledProgram PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnrolledProgram, {partial: true}),
        },
      },
    })
    enrolledProgram: EnrolledProgram,
  ): Promise<void> {
    await this.enrolledProgramRepository.updateById(id, enrolledProgram);
  }

  @put('/enrolled-programs/{id}')
  @response(204, {
    description: 'EnrolledProgram PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() enrolledProgram: EnrolledProgram,
  ): Promise<void> {
    await this.enrolledProgramRepository.replaceById(id, enrolledProgram);
  }

  @del('/enrolled-programs/{id}')
  @response(204, {
    description: 'EnrolledProgram DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.enrolledProgramRepository.deleteById(id);
  }
}
