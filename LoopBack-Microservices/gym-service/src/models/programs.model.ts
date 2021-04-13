import {Entity, model, property} from '@loopback/repository';

@model()
export class Programs extends Entity {
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
  title: string;

  @property({
    type: 'string',
    default: "null",
  })
  desc?: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'string',
    default: "no as such",
  })
  duration?: string;


  constructor(data?: Partial<Programs>) {
    super(data);
  }
}

export interface ProgramsRelations {
  // describe navigational properties here
}

export type ProgramsWithRelations = Programs & ProgramsRelations;
