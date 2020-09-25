import { NowRequest, NowResponse } from '@vercel/node';
import { connect } from "../db/connection";
import Fna from '../db/Fna';
import mongoose from "mongoose";

export default (req: NowRequest, res: NowResponse) => {
    connect();
    try {
        const { user, children, income, debt, retirement } = req.body;
        Fna.findOneAndUpdate({ fnaId: (req.query.id as string) }, {
            $set: {
                user: user,
                children: children,
                income: income,
                debt: debt,
                retirement: retirement
            }
        }, { useFindAndModify: false, lean: true, new: true }).then((v) => {
            console.log(v);
            if (v) {
                mongoose.disconnect();
            }
        });
    } catch (e) {
        return res.json(JSON.stringify({ err: e }));
    }
}