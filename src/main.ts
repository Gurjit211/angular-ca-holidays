import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

import { registerLocaleData } from '@angular/common';
import enCA from '@angular/common/locales/en-CA';

registerLocaleData(enCA);

bootstrapApplication(App, appConfig)
  .catch(err => console.error(err));
