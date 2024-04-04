import { Module } from '@nestjs/common';
import { HealthModule, LoggerModule } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  ReservationsAppConfigModule,
  ReservationsAppConfigService,
} from '@app/common/configs/apps/reservations';
import { MongoDbModule } from '@app/common/databases/mongodb';
import { AUTH_SERVICE, PAYMENTS_SERVICE } from '@app/common/constants';

import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ReservationsRepository } from './reservations.repository';
import {
  ReservationDocument,
  ReservationSchema,
} from './models/reservation.schema';

@Module({
  imports: [
    MongoDbModule,
    MongoDbModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    ReservationsAppConfigModule,
    LoggerModule,
    // Telling the service that it can send an RPC request through the TCP transport layer the the Auth microservice
    // this how we inject the service to the client
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (
          reservationsAppConfigService: ReservationsAppConfigService,
        ) => ({
          transport: Transport.TCP,
          options: {
            host: reservationsAppConfigService.authServiceHost,
            port: reservationsAppConfigService.authServiceTcpPort,
          },
        }),
        inject: [ReservationsAppConfigService],
        imports: [ReservationsAppConfigModule],
      },
      {
        name: PAYMENTS_SERVICE,
        useFactory: (
          reservationsAppConfigService: ReservationsAppConfigService,
        ) => ({
          transport: Transport.TCP,
          options: {
            host: reservationsAppConfigService.paymentsServiceHost,
            port: reservationsAppConfigService.paymentsServiceTcpPort,
          },
        }),
        inject: [ReservationsAppConfigService],
        imports: [ReservationsAppConfigModule],
      },
    ]),
    HealthModule,
  ],
  controllers: [ReservationsController],
  providers: [
    ReservationsService,
    ReservationsRepository,
    ReservationsAppConfigService,
  ],
})
export class ReservationsModule {}
