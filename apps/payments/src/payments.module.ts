import { Module } from '@nestjs/common';

import {
  PaymentsAppConfigModule,
  PaymentsAppConfigService,
} from '@app/common/configs/apps/payments';
import { LoggerModule } from '@app/common';

import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  imports: [PaymentsAppConfigModule, LoggerModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsAppConfigService],
})
export class PaymentsModule {}
