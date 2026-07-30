// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // acq-hdfc-institution-be-sprint-4-sit
  server: 'http://a83bc6c0ba96e4b2781d7d6f6f9c0f08-72df3990d92ee63b.elb.us-east-1.amazonaws.com/acq/institution-eodapis/api',
  // geo-location-service-be
  server_second_port: 'http://34.231.129.57:32231/api',
  // acq-hdfc-institution-be-sprint-4-sit
  server_third_port: 'http://a83bc6c0ba96e4b2781d7d6f6f9c0f08-72df3990d92ee63b.elb.us-east-1.amazonaws.com/acq/institution-eodapis/api',
  // acq-hdfc-institution-be-sprint-4-sit
  server_risk_port: 'http://a83bc6c0ba96e4b2781d7d6f6f9c0f08-72df3990d92ee63b.elb.us-east-1.amazonaws.com/acq/institution-eodapis/risk',
  // http://54.234.58.84:30934/api/initiateFullRefundBankDetails
  server_riskReset_port: 'http://a83bc6c0ba96e4b2781d7d6f6f9c0f08-72df3990d92ee63b.elb.us-east-1.amazonaws.com/merchant/onboarding/api',
  server_onboarding_port: 'http://a83bc6c0ba96e4b2781d7d6f6f9c0f08-72df3990d92ee63b.elb.us-east-1.amazonaws.com/merchant/onboarding/api',
  apiUrl: 'http://a83bc6c0ba96e4b2781d7d6f6f9c0f08-72df3990d92ee63b.elb.us-east-1.amazonaws.com/merchant/onboarding/api/merchant',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
