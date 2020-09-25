import { toast } from "react-toastify";

class OfflineDB {
    constructor() {
        this.db;
        this._init();
    }

    _init() {
        window.onload = () => {
            const request = window.indexedDB.open('fna', 1);
        
            request.onerror = () => toast("Offline database failed to open", {
                hideProgressBar: true,
                type: "error"
            });
        
            request.onsuccess = () => {
                this.db = request.result;
            }
    
            request.onupgradeneeded = (e) => {
                let db = e.target.result;
                let objectStore = db.createObjectStore('fna', { keyPath: 'id', autoIncrement: true });
                objectStore.createIndex("user", "id", { unique: true });
                objectStore.createIndex("customer", "fna", { unique: true });
            } 
        }
    }

    _preamble() {
        const transaction = this.db.transaction("fna", "readwrite");
        const objectStore = transaction.objectStore("fna");
        
    }

    PUT(body) {
    }
}