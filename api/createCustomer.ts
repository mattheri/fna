import { NowRequest, NowResponse } from '@vercel/node';
import Fna from '../db/Fna';
import { connect } from "../db/connection";
import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";


export default (req: NowRequest, res: NowResponse) => {
    const { id, firstname, lastname, dob, age, lifeExpectancy } = req.body;
    connect();
    try {
        Fna.create({
            fnaId: uuidv4(),
            ownerId: id,
            FNA: {
                modules: {
                    fnaCompleted: false,
                    userCompleted: false,
                    childrenCompleted: false,
                    incomeCompleted: false,
                    debtCompleted: false,
                    retirementCompleted: false
                }
            },
            user: {
                firstname: firstname,
                lastname: lastname,
                dob: dob,
                age: age,
                lifeExpectancy: lifeExpectancy,
                street: "",
                city: "",
                country: "",
                postalCode: "",
                image: ""
            },
            children: {
                children: [
                    {name: "", lastname: "", dob: "", age: ""}
                ]
            },
            income: {
                gross: 0,
                net: 0,
                provincialTax: 0,
                federalTax: 0,
                EI: 0,
                QPIP: 0,
                QPP: 0
            },
            debt: {
                debt: [
                    {
                        name: "",
                        principal: 0,
                        debtType: "",
                        rate: 0,
                        payment: 0,
                        numberOfPayments: 0,
                        interestsOverTime: [],
                        principalOverTime: [],
                        totalInterestPaid: 0
                    }
                ]
            },
            retirement: {
                goal: 0,
                retirementAge: 65,
                rpc: {
                    start: 65,
                    amount: 696.56
                },
                qpp: {
                    start: 65,
                    amount: 1177.30
                },
                inflationRate: 0.02,
                lifeExpectancy: lifeExpectancy,
                income: [
                    {
                        gross: 0,
                        net: 0,
                        federalTax: 0,
                        provincialTax: 0
                    }
                ]
            }
        }).then((fna) => {
            res.json(fna);
            mongoose.disconnect();
        })
    } catch (e) {
        return res.json(JSON.stringify({ err: e }));
    }
}