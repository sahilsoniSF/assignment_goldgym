import {Entity, model, property} from '@loopback/repository';

@model()
export class MarkTeam extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;


  constructor(data?: Partial<MarkTeam>) {
    super(data);
  }
}

export interface MarkTeamRelations {
  // describe navigational properties here
}

export type MarkTeamWithRelations = MarkTeam & MarkTeamRelations;
