import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyAszFd2EEwSz4v72jhGElrqkDlBxub6B4E',
  authDomain: 'rutas-vmi-vanessa.firebaseapp.com',
  projectId: 'rutas-vmi-vanessa',
  storageBucket: 'rutas-vmi-vanessa.appspot.com',
  messagingSenderId: '6932972685',
  appId: '1:6932972685:web:c1bcd8347dd5ba82f00ec4',
  measurementId: 'G-9BX131CM2K',
}

const app = initializeApp(config)

const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
