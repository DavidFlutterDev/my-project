import { provideHttpClient } from "@angular/common/http";
import { APP_INITIALIZER, ApplicationConfig, inject } from "@angular/core";
import { LuxonDateAdapter } from "@angular/material-luxon-adapter";
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { provideClayAppShell } from '@clay/app-shell';
import { ENVIRONMENT_CONFIG } from '@clay/app-shell/shared';
import { provideAuth } from '@clay/app-shell/structural';
import { TranslocoHttpLoader, provideIcons } from '@clay/ui-commons/ancillary';
import { mockedApis } from '../../api/mock/mocked.apis';
import { environment } from "../../environments/environment";
import { defaultNavigation } from "./app.nav";
import { appRoutes } from './app.routes';
import { TranslocoService, provideTransloco } from "@ngneat/transloco";
import { firstValueFrom } from "rxjs";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),

    provideHttpClient(),

    provideRouter(
      appRoutes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),

    // Material Date Adapter
    {
      provide: DateAdapter,
      useClass: LuxonDateAdapter,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'D',
        },
        display: {
          dateInput: 'DDD',
          dateA11yLabel: 'DD',
          monthYearLabel: 'LLL yyyy',
          monthYearA11yLabel: 'LLLL yyyy',
        },
      },
    },

    // Transloco Config
    provideTransloco({
      config: {
        availableLangs: [
          {
            id: 'en',
            label: 'English',
          },
          {
            id: 'tr',
            label: 'Turkish',
          },
        ],
        defaultLang: 'en',
        fallbackLang: 'en',
        reRenderOnLangChange: true,
        prodMode: true,
      },
      loader: TranslocoHttpLoader,
    }),
    {
      // Preload the default language before the app starts to prevent empty/jumping content
      provide: APP_INITIALIZER,
      useFactory: () => {
        const translocoService = inject(TranslocoService);
        const defaultLang = translocoService.getDefaultLang();
        translocoService.setActiveLang(defaultLang);

        return () => firstValueFrom(translocoService.load(defaultLang));
      },
      multi: true,
    },

    // Clay
    provideAuth(),

    provideIcons(),

    provideClayAppShell({
      environment: {
        provide: ENVIRONMENT_CONFIG,
        useValue: environment,
      },
      mockApi: {
        delay: 0,
        services: mockedApis,
      },
      clAppConfig: {
        scheme: 'light',
        layout: 'classy-fss',
        screens: {
          sm: '600px',
          md: '960px',
          lg: '1280px',
          xl: '1440px',
        },
        theme: 'theme-fss',
        themes: [
          {
            id: 'theme-fssTheme',
            name: 'FSS',
          },
          {
            id: 'theme-default',
            name: 'Default',
          },
          {
            id: 'theme-brand',
            name: 'Brand',
          },
          {
            id: 'theme-teal',
            name: 'Teal',
          },
          {
            id: 'theme-rose',
            name: 'Rose',
          },
          {
            id: 'theme-purple',
            name: 'Purple',
          },
          {
            id: 'theme-amber',
            name: 'Amber',
          },
        ],
      },
    }),
  ],
};
