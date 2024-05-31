import { Module } from '@nestjs/common';
import { RawModule } from './raw/raw.module';
import { PrismaModule } from 'nestjs-prisma';
import { HistoriesModule } from './histories/histories.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guard/auth.guard';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    JwtModule.register({ global: true }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RawModule,
    AuthModule,
    HistoriesModule,
    PrismaModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
