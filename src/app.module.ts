import { Module } from '@nestjs/common';
import { RawModule } from './raw/raw.module';
import { PrismaModule } from 'nestjs-prisma';
import { HistoriesModule } from './histories/histories.module';

@Module({
  imports: [
    RawModule,
    HistoriesModule,
    PrismaModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
