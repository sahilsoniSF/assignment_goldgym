import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'enquiry',
  connector: 'postgresql',
  url: '',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'soni',
  database: 'enquiryservice'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class EnquiryDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'enquiry';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.enquiry', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
