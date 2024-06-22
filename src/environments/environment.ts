// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBx2ZB6RRkVJD_yTegYY62TAUnqW_og89c",
    authDomain: "finsguardian.firebaseapp.com",
    projectId: "finsguardian",
    storageBucket: "finsguardian.appspot.com",
    messagingSenderId: "215506381329",
    appId: "1:215506381329:web:a740cf91e28ebd8ad59fb0"
  },
  apiEndPoint: 'https://api-finsguardian.mominur.net/api'
  // apiEndPoint: 'http://127.0.0.1:8000/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
