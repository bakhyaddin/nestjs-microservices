import { Logger, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import {
  PaymentsAppConfigModule,
  PaymentsAppConfigService,
} from '@app/common/configs/apps/payments';
import { LoggerModule } from '@app/common';
import { NOTIFICATIONS_SERVICE } from '@app/common/constants';

import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  imports: [
    PaymentsAppConfigModule,
    LoggerModule,
    ClientsModule.registerAsync([
      {
        name: NOTIFICATIONS_SERVICE,
        useFactory: (paymentsAppConfigService: PaymentsAppConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: paymentsAppConfigService.notificationsServiceHost,
            port: paymentsAppConfigService.notificationsServicePort,
          },
        }),
        inject: [PaymentsAppConfigService],
        imports: [PaymentsAppConfigModule],
      },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsAppConfigService, Logger],
})
export class PaymentsModule {}
