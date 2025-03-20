import { Injectable } from '@nestjs/common';
import * as ZKLib from 'zklib-js';

@Injectable()
export class ZktecoService {
  private zkteco: ZKLib;

  constructor() {
    this.zkteco = new ZKLib();
  }

  async getAllAttendace(): Promise<any> {
    await this.zkteco.createSocket();
    return this.zkteco.getAttendances();
  }
}
