import { Injectable } from '@nestjs/common';

import { CreateChargeDto } from '../../../libs/common/src/dto/create-charge.dto';

@Injectable()
export class PaymentsService {
  async createCharge({ amount }: CreateChargeDto) {
    return new Promise((resolve) => {
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
  }
}
