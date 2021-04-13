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
import {MarkTeam} from '../models';
import {MarkTeamRepository} from '../repositories';

export class MarkteamController {
  constructor(
    @repository(MarkTeamRepository)
    public markTeamRepository : MarkTeamRepository,
  ) {}

  @post('/mark-teams')
  @response(200, {
    description: 'MarkTeam model instance',
    content: {'application/json': {schema: getModelSchemaRef(MarkTeam)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MarkTeam, {
            title: 'NewMarkTeam',
            exclude: ['id'],
          }),
        },
      },
    })
    markTeam: Omit<MarkTeam, 'id'>,
  ): Promise<MarkTeam> {
    return this.markTeamRepository.create(markTeam);
  }

  @get('/mark-teams/count')
  @response(200, {
    description: 'MarkTeam model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MarkTeam) where?: Where<MarkTeam>,
  ): Promise<Count> {
    return this.markTeamRepository.count(where);
  }

  @get('/mark-teams')
  @response(200, {
    description: 'Array of MarkTeam model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MarkTeam, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MarkTeam) filter?: Filter<MarkTeam>,
  ): Promise<MarkTeam[]> {
    return this.markTeamRepository.find(filter);
  }

  @patch('/mark-teams')
  @response(200, {
    description: 'MarkTeam PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MarkTeam, {partial: true}),
        },
      },
    })
    markTeam: MarkTeam,
    @param.where(MarkTeam) where?: Where<MarkTeam>,
  ): Promise<Count> {
    return this.markTeamRepository.updateAll(markTeam, where);
  }

  @get('/mark-teams/{id}')
  @response(200, {
    description: 'MarkTeam model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MarkTeam, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MarkTeam, {exclude: 'where'}) filter?: FilterExcludingWhere<MarkTeam>
  ): Promise<MarkTeam> {
    return this.markTeamRepository.findById(id, filter);
  }

  @patch('/mark-teams/{id}')
  @response(204, {
    description: 'MarkTeam PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MarkTeam, {partial: true}),
        },
      },
    })
    markTeam: MarkTeam,
  ): Promise<void> {
    await this.markTeamRepository.updateById(id, markTeam);
  }

  @put('/mark-teams/{id}')
  @response(204, {
    description: 'MarkTeam PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() markTeam: MarkTeam,
  ): Promise<void> {
    await this.markTeamRepository.replaceById(id, markTeam);
  }

  @del('/mark-teams/{id}')
  @response(204, {
    description: 'MarkTeam DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.markTeamRepository.deleteById(id);
  }
}
