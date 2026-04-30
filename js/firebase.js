
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
  import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";
  const cfg = {
    apiKey: "AIzaSyBG3CCVIZbeytBzzlGqSFME3hGizQioMRI",
    authDomain: "melonhydro-13b18.firebaseapp.com",
    projectId: "melonhydro-13b18",
    storageBucket: "melonhydro-13b18.firebasestorage.app",
    messagingSenderId: "67286297774",
    appId: "1:67286297774:web:4d13a46d2499a99a1d513f",
    databaseURL: "https://melonhydro-13b18-default-rtdb.asia-southeast1.firebasedatabase.app"
  };
  try {
    const app = initializeApp(cfg);
    const db  = getDatabase(app);
    window._fbConnected = false;
    onValue(ref(db,"sensors"), snap=>{
      window._fbConnected = true;
      const d = snap.val()||{};
      window._updateSensors(d);
      if(window._setFBStatus) window._setFBStatus(true);
    }, err=>{
      window._fbConnected = false;
      if(window._setFBStatus) window._setFBStatus(false);
    });
    window._setPump = (v) => set(ref(db,"actuators/pompa_air"), v);
    window._setLamp = (v) => set(ref(db,"actuators/lampu"), v);
  } catch(e){
    window._fbConnected = false;
    console.warn("Firebase not configured, running demo mode");
    if(window._setFBStatus) window._setFBStatus(false);
  }
