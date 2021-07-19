import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as HttpsProxyAgent from 'https-proxy-agent';
import * as fs from 'fs';
import {
  BASE_URL,
  VGS_HOST,
  VGS_PORT,
  VGS_USERNAME,
  VGS_PASSWORD,
  FLUTTERWAVE_SECRET_KEY,
  FLUTTERWAVE_ENCRYPTION_KEY,
} from '../config';

@Injectable()
export class AxiosService {
  // AXIOS FUNCTIONS

  public Request() {
    return axios.create({
      baseURL: BASE_URL,
      headers: this.setHeaderAuthorization(),
    });
  }

  public ProxyRequest() {
    // const urlParams = url.parse(
    //   `https://${VGS_USERNAME}:${VGS_PASSWORD}@${VGS_OUTBOUND_URL}`,
    // );
    const agent = HttpsProxyAgent({
      host: VGS_HOST,
      port: VGS_PORT,
      auth: `${VGS_USERNAME}:${VGS_PASSWORD}`,
      ca: [fs.readFileSync(__dirname + '/../../resources/cert.pem')],
    });
    return axios.create({
      baseURL: BASE_URL,
      headers: this.setHeaderAuthorization(),
      httpsAgent: agent,
    });
  }

  public NoTokenRequest() {
    return axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private setHeaderAuthorization() {
    return {
      Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
      'Content-Type': 'application/json',
      'X-Private-Key': `${FLUTTERWAVE_ENCRYPTION_KEY}`,
      Accept: 'application/json',
    };
  }
}
