import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { DBModule } from './db/db.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ApiInterceptor } from '@common/interceptor';
import { HttpExceptionFilter } from '@common/filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ScheduleModule.forRoot(),
    DBModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ],
})
export class AppModule {}
