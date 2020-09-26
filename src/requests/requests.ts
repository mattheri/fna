import { notify } from "../components/Toast/Toast";

export const request = async (
    path: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body?: any,
    cb?: any
) => {
    if (navigator.onLine) {

        try {
            const options: {[key: string]: RequestInit} = {
                ["GET"]: {
                    method: "GET"
                },
                ["POST"]: {
                    method: "POST",
                    mode: "cors",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                },
                ["PUT"]: {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                },
                ["DELETE"]: {
                    method: "DELETE"
                }
            };
            const res = await fetch(window.location.origin + path, options[method]);
            const json = await res.json();
            if (cb) cb(json);
            console.log(json);
            if (!res.ok) throw new Error(JSON.parse(json).err);
            return json;

        } catch (e) {
            notify({ type: "error", msg: e.message });
            return {
                ok: false,
                err: e.message
            };
        }
    }
}