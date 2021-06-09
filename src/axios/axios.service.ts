import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AxiosService {
  // AXIOS FUNCTIONS

  public Request() {
    return axios.create({
      baseURL: process.env.BASE_URL,
      headers: this.setHeaderAuthorization(),
    });
  }

  public NoTokenRequest() {
    return axios.create({
      baseURL: process.env.BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private setHeaderAuthorization() {
    return {
      Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }
}
