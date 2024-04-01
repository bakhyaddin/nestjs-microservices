import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { NOTIFICATIONS_SERVICE } from '@app/common/constants';

import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
    private readonly logger: Logger,
  ) {}

  async createCharge({ amount, email }: PaymentsCreateChargeDto) {
    try {
      const transaction = await new Promise((resolve) => {
        return setTimeout(
          () =>
            resolve({
              id: Math.random().toString(36).substring(2, 12),
              amount,
              currency: 'usd',
            }),
          1500,
        );
      });
      this.notificationsService.emit('notify_email', { email });
      return transaction;
    } catch (err) {
      this.logger.error('Error during transaction', err.message);
      throw err;
    }
  }
}
