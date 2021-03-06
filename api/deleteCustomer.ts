import { NowRequest, NowResponse } from '@vercel/node';
import Fna from '../db/Fna';
import { connect } from '../db/connection';
import mongoose from "mongoose";

export default (req: NowRequest, res: NowResponse) => {
    connect();
    try {
        Fna.deleteOne({ fnaId: (req.query.id as string) }).then((fna) => {
            res.json(fna);
            mongoose.disconnect();
        });
    } catch (e) {
        return res.json(JSON.stringify({ err: e }));
    }
}