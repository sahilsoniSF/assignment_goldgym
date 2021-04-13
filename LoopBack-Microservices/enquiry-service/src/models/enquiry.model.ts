import {Entity, model, property} from '@loopback/repository';

@model()
export class Enquiry extends Entity {
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
  programId: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  desc: string;

  @property({
    type: 'number',
    required: true,
  })
  userId: number;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'string',
    default: "empty",
  })
  reply?: string;


  constructor(data?: Partial<Enquiry>) {
    super(data);
  }
}

export interface EnquiryRelations {
  // describe navigational properties here
}

export type EnquiryWithRelations = Enquiry & EnquiryRelations;
