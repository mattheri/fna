import mongoose, { Schema, Document } from "mongoose";

export interface IFNA extends Document {
    fnaId: string,
    ownerId: string,
    FNA: {
        modules: {
            fnaCompleted: boolean,
            userCompleted: boolean,
            childrenCompleted: boolean,
            incomeCompleted: boolean,
            debtCompleted: boolean,
            retirementCompleted: boolean
        }
    };
    user: {
        firstname: string,
        lastname: string,
        dob: string,
        age: string,
        lifeExpectancy: string,
        street: string,
        city: string,
        country: string,
        postalCode: string
    };
    children: {
        children: {
            name: string,
            lastname: string,
            dob: string,
            age: string
        }[]
    };
    income: {
        gross: number,
        net: number,
        provincialTax: number,
        federalTax: number,
        EI: number,
        QPIP: number,
        QPP: number
    };
    debt: {
        debt: {
            name: string,
            principal: number,
            debtType: string,
            rate: number,
            payment: number,
            numberOfPayments: number,
            interestsOverTime: number[],
            principalOverTime: number[],
            totalInterestPaid: number
        }[]
    };
    retirement: {
        goal: number,
        retirementAge: number,
        rpc: {
            start: number,
            amount: number
        },
        qpp: {
            start: number,
            amount: number
        },
        inflationRate: number,
        lifeExpectancy: string,
        income: {
            gross: number,
            net: number,
            federalTax: number,
            provincialTax: number
        }[]
    };
}

const fnaSchema: Schema = new mongoose.Schema({
    fnaId: String,
    ownerId: String,
    FNA: {
        modules: {
            fnaCompleted: Boolean,
            userCompleted: Boolean,
            childrenCompleted: Boolean,
            incomeCompleted: Boolean,
            debtCompleted: Boolean,
            retirementCompleted: Boolean
        }
    },
    user: {
        firstname: String,
        lastname: String,
        dob: String,
        age: String,
        lifeExpectancy: String,
        street: String,
        city: String,
        country: String,
        postalCode: String
    },
    children: {
        children: [{
            name: String,
            lastname: String,
            dob: String,
            age: String
        }]
    },
    income: {
        gross: Number,
        net: Number,
        provincialTax: Number,
        federalTax: Number,
        EI: Number,
        QPIP: Number,
        QPP: Number
    },
    debt: {
        debt: [{
            name: String,
            principal: Number,
            debtType: String,
            rate: Number,
            payment: Number,
            numberOfPayments: Number,
            interestsOverTime: [Number],
            principalOverTime: [Number],
            totalInterestPaid: Number
        }]
    },
    retirement: {
        goal: Number,
        retirementAge: Number,
        rpc: {
            start: Number,
            amount: Number
        },
        qpp: {
            start: Number,
            amount: Number
        },
        inflationRate: Number,
        lifeExpectancy: String,
        income: [{
            gross: Number,
            net: Number,
            federalTax: Number,
            provincialTax: Number
        }]
    }
});

export default mongoose.model<IFNA>("FNA", fnaSchema);