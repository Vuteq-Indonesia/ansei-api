// clients.module.ts

import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 1500,
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class ClientsGlobalModule {}