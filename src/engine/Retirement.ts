import { IncomeDetails } from "./Income";

class RetirementIncome extends IncomeDetails {
    gross: number;
    provincialTax: number;
    federalTax: number;
    net: number;
    constructor(gross: number) {
        super(gross);
        this.gross = gross;
        this.provincialTax = this._provincialTax();
        this.federalTax = this._federalTax();
        this.net = this._getNet();
    }

    _getNet() {
        return this.gross - (this.federalTax + this.provincialTax);
    }
}


export class RetirementDetails {
    goal: number;
    qpp: {
        start: number,
        amount: number
    };
    rpc: {
        start: number,
        amount: number
    };
    inflationRate: number;
    retirementAge: number;
    lifeExpectancy: number;
    income: RetirementIncome[];
    constructor(
        goal: number,
        retirementAge: number,
        lifeExpectancy: number,
        qpp?: {
            amount: number,
            start: number
        },
        rpc?: {
            amount: number,
            start: number
        },
        inflationRate?: number
    )
    {
        this.goal = goal;
        this.qpp = qpp || {
            start: 65,
            amount: 1177.30
        };
        this.rpc = rpc || {
            start: 65,
            amount: 696.56
        };
        this.retirementAge = retirementAge;
        this.lifeExpectancy = lifeExpectancy;
        this.inflationRate = inflationRate || 0.02;
        this.income = this._getRetirementTimeline();
    }    

    _applyInflationRate(val: number) {
        return val * (this.inflationRate + 1);
    }

    _getIncome(age: number, additionalAmount?: number) {
        let i = 0;

        if (age >= this.qpp.start) i += this._applyInflationRate(this.qpp.amount);
        if (age >= this.rpc.start) i += this._applyInflationRate(this.rpc.amount);
        if (additionalAmount) i += additionalAmount;
        return i * 12;
    }

    _getRetirementTimeline() {
        let g = this.goal;
        let y = 0;
        const incomePerYear = [];
        incomePerYear.push(new RetirementIncome(this._getIncome(this.retirementAge)));
        for (let i = this.retirementAge + 1; i <= this.lifeExpectancy; i++) {
            g = this._applyInflationRate(g);
            incomePerYear.push(new RetirementIncome(this._applyInflationRate(incomePerYear[y].gross)));
            y++;
        }

        return incomePerYear;
    }
}