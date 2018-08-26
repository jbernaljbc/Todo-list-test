import firebase from "@firebase/app";
import "@firebase/firestore";
import { config } from './config/config'

const app = firebase.initializeApp(config);
const firestore = firebase.firestore(app);

const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export default firestore;