import { Module } from '@nestjs/common';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { LogLevel } from '@sentry/types';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    SentryModule.forRoot({
      debug: true,
      dsn:
        'https://45740e3ae4864e77a01ad61a47ea3b7e@o115888.ingest.sentry.io/25956308132020',
      logLevel: LogLevel.Debug,
      environment: 'development',
      tracesSampleRate: 1.0,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
