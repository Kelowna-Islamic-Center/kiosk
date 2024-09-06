import { initializeApp } from "firebase/app";
import { collection, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { writable, type Writable } from "svelte/store";
import type { Prayer, Announcement } from "./types";
import { env } from '$env/dynamic/public'

const apiLink = env.PUBLIC_API_LINK!;
const config = {
    "apiKey": env.PUBLIC_FB_API_KEY,
    "authDomain": env.PUBLIC_FB_AUTH_DOMAIN,
    "projectId": env.PUBLIC_FB_PROJECT_ID,
    "storageBucket": env.PUBLIC_FB_STORAGE_BUCKET,
    "messagingSenderId": env.PUBLIC_FB_MESSAGING_SENDER_ID,
    "appId": env.PUBLIC_FB_APP_ID
}

export const prayerStore: Writable<Prayer[] | null> = writable(null);
export const announcementStore: Writable<Announcement[] | null> = writable(null);

export class FirebaseService {

    app; db;

    // Setup firebase credentials
    constructor() {
        this.app = initializeApp(config);
        this.db = getFirestore(this.app);

        this.fetchTimesWorker();
        this.fetchAnnouncmentsWorker();
    }

    // Get times from BCMA api and firebase
    async fetchTimesWorker() {
        let localStore: Prayer[] = [];

        checkAPI();
        setInterval(() => {
            const hour = (new Date()).getHours();
            if (hour !== 0 && hour !== 6 && hour !== 12 && hour !== 18) return; // If not 12AM, 6AM, 12PM, and 6PM, then return
            checkAPI();
        }, 900000); // 15 minute intervals

        // A check function for realtime data from API
        async function checkAPI() {
            let request = await fetch(apiLink, { cache: "no-store" });
            let newData = await request.json();

            if (!isEqual(newData, localStore)) {
                localStore = newData;
                prayerStore.set(localStore);
            }

            function isEqual(arr1: Prayer[], arr2: Prayer[]) {
                for (let i = 0; i < arr1.length; i++) {
                    if (JSON.stringify(arr1[i]) != JSON.stringify(arr2[i])) return false;
                }
                return true;
            }
        }
    }

    // Get announcements from firestore and store then in svelte store
    fetchAnnouncmentsWorker() {

        const q = query(collection(this.db, "announcements"), where("platforms", "array-contains", "web"));

        onSnapshot(q, (snapshot) => {
            const data: Announcement[] = [];

            snapshot.forEach((doc) => {
                if (!(doc.data().hasOwnProperty("title") || doc.data().hasOwnProperty("description") || doc.data().hasOwnProperty("timeStamp"))) return;
                data.push({ ...{ id: doc.id }, ...doc.data() });
            });

            announcementStore.set(data);
        });
    }
}