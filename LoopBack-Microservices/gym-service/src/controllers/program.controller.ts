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
import {Programs} from '../models';
import {ProgramsRepository} from '../repositories';

export class ProgramController {
  constructor(
    @repository(ProgramsRepository)
    public programsRepository : ProgramsRepository,
  ) {}

  @post('/programs')
  @response(200, {
    description: 'Programs model instance',
    content: {'application/json': {schema: getModelSchemaRef(Programs)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Programs, {
            title: 'NewPrograms',
            exclude: ['id'],
          }),
        },
      },
    })
    programs: Omit<Programs, 'id'>,
  ): Promise<Programs> {
    return this.programsRepository.create(programs);
  }

  @get('/programs/count')
  @response(200, {
    description: 'Programs model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Programs) where?: Where<Programs>,
  ): Promise<Count> {
    return this.programsRepository.count(where);
  }

  @get('/programs')
  @response(200, {
    description: 'Array of Programs model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Programs, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Programs) filter?: Filter<Programs>,
  ): Promise<Programs[]> {
    return this.programsRepository.find(filter);
  }

  @patch('/programs')
  @response(200, {
    description: 'Programs PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Programs, {partial: true}),
        },
      },
    })
    programs: Programs,
    @param.where(Programs) where?: Where<Programs>,
  ): Promise<Count> {
    return this.programsRepository.updateAll(programs, where);
  }

  @get('/programs/{id}')
  @response(200, {
    description: 'Programs model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Programs, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Programs, {exclude: 'where'}) filter?: FilterExcludingWhere<Programs>
  ): Promise<Programs> {
    return this.programsRepository.findById(id, filter);
  }

  @patch('/programs/{id}')
  @response(204, {
    description: 'Programs PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Programs, {partial: true}),
        },
      },
    })
    programs: Programs,
  ): Promise<void> {
    await this.programsRepository.updateById(id, programs);
  }

  @put('/programs/{id}')
  @response(204, {
    description: 'Programs PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() programs: Programs,
  ): Promise<void> {
    await this.programsRepository.replaceById(id, programs);
  }

  @del('/programs/{id}')
  @response(204, {
    description: 'Programs DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.programsRepository.deleteById(id);
  }
}
