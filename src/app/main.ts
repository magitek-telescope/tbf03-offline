import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

localStorage.setItem('is_fetched', '0');

platformBrowserDynamic().bootstrapModule(AppModule);
