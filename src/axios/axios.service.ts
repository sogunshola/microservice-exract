import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as HttpsProxyAgent from 'https-proxy-agent';
import * as fs from 'fs';

@Injectable()
export class AxiosService {
  // AXIOS FUNCTIONS

  public Request() {
    return axios.create({
      baseURL: process.env.BASE_URL,
      headers: this.setHeaderAuthorization(),
    });
  }

  public ProxyRequest() {
    // const urlParams = url.parse(
    //   `https://${process.env.VGS_USERNAME}:${process.env.VGS_PASSWORD}@${process.env.VGS_OUTBOUND_URL}`,
    // );
    const agent = HttpsProxyAgent({
      host: process.env.VGS_HOST,
      port: process.env.VGS_PORT,
      auth: `${process.env.VGS_USERNAME}:${process.env.VGS_PASSWORD}`,
      ca: [fs.readFileSync(__dirname + '/../../resources/cert.pem')],
    });
    return axios.create({
      baseURL: process.env.BASE_URL,
      headers: this.setHeaderAuthorization(),
      httpsAgent: agent,
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
      'X-Private-Key': `${process.env.FLUTTERWAVE_ENCRYPTION_KEY}`,
      Accept: 'application/json',
    };
  }
}
