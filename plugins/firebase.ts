import { initializeApp } from "firebase/app";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.firebaseApiKey,
    authDomain: cconfig.firebaseAuthDomain,
    projectId: config.firebaseProjectId,
    storageBucket: config.firebaseStorageBucket,
    messagingSenderId: config.firebaseMessagingSenderId,
    appId: config.firebaseAppId,
  };
  
  const app = initializeApp(firebaseConfig);

});
