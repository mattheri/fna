import { NowRequest, NowResponse } from '@vercel/node';
import User from "../db/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { connect } from '../db/connection';

export default (req: NowRequest, res: NowResponse) => {
    connect();
    try {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) return err;
            if (!user) {
                return res
                    .status(403)
                    .json(JSON.stringify({ err: "No user found with this username!" }));
            }
    
            bcrypt.compare(req.body.password, user.hash, (err, auth) => {
                if (auth) return res.json({
                    id: user._id
                });
                return res
                    .status(403)
                    .json(JSON.stringify({ err: "Invalid username or password!" }));
            });
        })
            .then(() => mongoose.disconnect());
    } catch (e) {
        return res.json(JSON.stringify({ err: e }));
    }
}