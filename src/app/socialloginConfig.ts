import {
    SocialLoginModule,AuthServiceConfig,GoogleLoginProvider,FacebookLoginProvider
  } from 'angular-6-social-login';

export function getAuthServiceConfigs() {
    let config = new AuthServiceConfig(
        [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider("531172754006396")
          },
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("663055125502-rk358bmnudrrlablb5afi5rg2lsbpuo6.apps.googleusercontent.com")
          }
        ]
    );
    return config;
    }
  