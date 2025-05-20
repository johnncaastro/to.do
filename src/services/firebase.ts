import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCfY23H_lid4hWatPAmnl0VbxmLhdwKwiI',
  authDomain: 'to-do-4ead3.firebaseapp.com',
  projectId: 'to-do-4ead3',
  storageBucket: 'to-do-4ead3.firebasestorage.app',
  messagingSenderId: '800944703018',
  appId: '1:800944703018:web:fb984779ae6f1a782a2553',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

// https://to-do-4ead3.firebaseapp.com/__/auth/handler
