import { ApiResponse } from '@common/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): ApiResponse {
    return {
      message: 'Success',
      data: null
    }
  }
}
