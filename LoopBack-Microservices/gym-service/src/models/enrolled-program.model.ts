import {Entity, model, property} from '@loopback/repository';

@model()
export class EnrolledProgram extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  programId: number;

  @property({
    type: 'string',
    required: true,
  })
  username: string;


  constructor(data?: Partial<EnrolledProgram>) {
    super(data);
  }
}

export interface EnrolledProgramRelations {
  // describe navigational properties here
}

export type EnrolledProgramWithRelations = EnrolledProgram & EnrolledProgramRelations;
