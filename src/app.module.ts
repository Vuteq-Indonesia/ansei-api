import {Module} from '@nestjs/common';
import {RawModule} from './raw/raw.module';
import {PrismaModule} from 'nestjs-prisma';


@Module({
  imports: [RawModule,PrismaModule.forRoot({
    isGlobal: true,
  }),],
  controllers: [],
  providers: [],
})
export class AppModule {}
