import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

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
  const auth = getAuth(app);
  
  nuxtApp.vueApp.provide('auth', auth);
  nuxtApp.provide('auth', auth);
});
