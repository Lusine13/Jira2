
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDKSqTNc4fHcMhYWeEwMidRQN-EnbB-0zA",
  authDomain: "jira-228e9.firebaseapp.com",
  projectId: "jira-228e9",
  storageBucket: "jira-228e9.appspot.com",
  messagingSenderId: "871686075901",
  appId: "1:871686075901:web:f8105f87068e4c1c145594"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
