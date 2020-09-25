import React from 'react';
import { atom, selector, useRecoilValue, DefaultValue, RecoilState } from "recoil";
import defaultsDeep from "lodash/fp/defaultsDeep";

export const userState = atom({
    key: "userState",
    default: {
        firstname: "",
        lastname: "",
        dob: "",
        age: "",
        lifeExpectancy: "82",
        street: "",
        city: "",
        country: "",
        postalCode: ""
    }
});

export const childrenState = atom({
    key: "childrenState",
    default: {
        children:[{name: "", lastname: "", dob: "", age: ""}]
    }
});

export const incomeState = atom({
    key: "incomeState",
    default: {
        gross: 0,
        net: 0,
        provincialTax: 0,
        federalTax: 0,
        EI: 0,
        QPIP: 0,
        QPP: 0
    }
});

export const debtState = atom({
    key: "debtState",
    default: {
        debt: [
            {
                name: "",
                principal: 0,
                debtType: "personal",
                rate: 0,
                payment: 0,
                numberOfPayments: 0,
                interestsOverTime: [0],
                principalOverTime: [0],
                totalInterestPaid: 0
            }
        ]
    }
});

export const retirementState = atom({
    key: "retirementState",
    default: {
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
        income: [
            {
                gross: 0,
                net: 0,
                federalTax: 0,
                provincialTax: 0
            }
        ]
    }
});

interface Retirement {
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
        }
        lifeExpectancy: number,
        inflationRate: number,
        income: [
            {
                gross: number,
                net: number,
                federalTax: number,
                provincialTax: number
            }
        ]
    }
}

export const currentRetirementState = selector({
    key: "currentRetirementState",
    get: ({ get }) => {
        const retirement = get(retirementState);
        const user = get(userState);

        return defaultsDeep(retirement, { lifeExpectancy: parseInt(user.lifeExpectancy) });
    }
})

export const fnaState = atom({
    key: "fnaState",
    default: {
        fnaId: "",
        ownerId: "",
        FNA: {
            modules: {
                fnaCompleted: false,
                userCompleted: false,
                childrenCompleted: false,
                incomeCompleted: false,
                debtCompleted: false,
                retirementCompleted: false
            }
        }
    }
});

export const currentFnaState = selector({
    key: "currentFnaState",
    get: ({ get }) => {
        const fna = get(fnaState);
        const user = get(userState);
        const children = get(childrenState);
        const income = get(incomeState);
        const debt = get(debtState);
        const retirement = get(currentRetirementState);

        return defaultsDeep(fna, { user: { ...user }, children: { ...children }, income: { ...income }, debt: { ...debt }, retirement: { ...(retirement as Retirement) } });
    },
    set: ({ set }, newValue) => {
        set(fnaState, newValue instanceof DefaultValue && newValue);
    }
});
