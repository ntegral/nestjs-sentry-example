import { Controller, Get } from '@nestjs/common';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { Breadcrumb, Scope, Severity } from '@sentry/node';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @InjectSentry() private readonly client: SentryService,
    private readonly appService: AppService,
  ) {
    const breadcrumb: Breadcrumb = {
      type: 'sample',
      level: Severity.Info,
      category: 'custom',
      event_id: '1',
      message: 'Generic breadcrumb message',
    };
    client.addBreadcrumb(breadcrumb);
    client.debug('App Controller loaded');
    const scope = new Scope();
    scope.setTag('example', 'sampleTag');
    client.captureException(new Error('sample error'), () => scope);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
