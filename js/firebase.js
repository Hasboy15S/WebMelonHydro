
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
  import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";
  const cfg = { apiKey:"API_KEY_KAMU", databaseURL:"https://console.firebase.google.com/u/0/project/melonhydro-13b18/database/melonhydro-13b18-default-rtdb/data/~2F?hl=id" };
  try {
    const app = initializeApp(cfg);
    const db  = getDatabase(app);
    onValue(ref(db,"sensors"), snap=>{
      const d = snap.val()||{};
      window._updateSensors(d);
    });
    window._setPump = (v) => set(ref(db,"actuators/pompa_air"), v);
    window._setLamp = (v) => set(ref(db,"actuators/lampu"), v);
  } catch(e){ console.warn("Firebase not configured, running demo mode"); }
