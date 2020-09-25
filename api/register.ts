import { NowRequest, NowResponse } from '@vercel/node';
import User from "../db/User";
import bcrypt from "bcrypt";
import mongoose from 'mongoose';
import { connect } from '../db/connection';

export default (req: NowRequest, res: NowResponse) => {
    connect();
    try {
        const saltRounds = 12;
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            User.findOne({ email: req.body.email }, (err, user) => {
                if (err) return err;
                if (user) return res.status(403).json(JSON.stringify({ err: "A user already exists with this username!" }));
    
                User.create({
                    email: req.body.email,
                    hash: hash
                }).then((user) => {
                    res.json(user);
                    mongoose.disconnect();
                });
            });
        });
    } catch (e) {
        return res.json(JSON.stringify({ err: e }));
    }
}