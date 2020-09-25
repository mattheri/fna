export class Mortgage {
    name: string;
    principal: number;
    rate: number;
    payment: number;
    numberOfPayments: number;
    interestOverTime: number[];
    principalOverTime: number[];
    totalInterestPaid: number;
    constructor(
        name: string,
        principal: number,
        rate: number,
        payment: number,
        numberOfPayments: number
    ) {
        this.name = name;
        this.principal = principal;
        this.rate = rate;
        this.payment = payment;
        this.numberOfPayments = numberOfPayments;
        this.principalOverTime = [];
        this.interestOverTime = this._calculateInterests();
        this.totalInterestPaid = this._getTotalInterestsPaid();
    }

    _getInterests(principal: number, rate?: number) {
        return principal * (rate || this._getCompoundedRate());
    }

    _getCompoundedRate(rate?: number) {
        //rate is calculated twice per year. However, monthly payments are made and coumponded monthly
        //hence this formula
        return (((((rate || this.rate) / 100) / 2) + 1) ** (1 / 6) - 1);
    }

    _calculateInterests() {
        const interests: number[] = [];
        let p = 0;
        let interest = this._getInterests(p);
        console.log(this._getInterests(this.principal))
        for (let i = 0; i < this.numberOfPayments; i++) {
            if (p >= 0) {
                p = ((p || this.principal) + interest) - this.payment;
                interest = this._getInterests(p);
                interests.push((interest < 0) ? 0 : interest);
                this.principalOverTime.push((p < 0) ? 0 : p);
            }
        }
        return interests;
    }

    _getTotalInterestsPaid() {
        return this.interestOverTime.reduce((acc, val) => acc + val);
    }

    lumpSum(sum: number) {
        return this.principal -= sum;
    }

    do(callback: () => number, frequency: "once" | "repeat", unit?: number) {
        function hasUnit<T>(unit?: T): T {
            if (!unit) throw new Error("You need to specify the number of time the event happens. Ex.: each 3 months, each 12 months");
            return unit;
        }
        
        if (frequency === "repeat") {
            const u = hasUnit(unit);
            for (let i = 0; i < this.numberOfPayments; i += u) {
                callback();
            }
            return true;
        }

        if (frequency === "once") {
            callback();
            return true;
        }

        return false;
    }

    getNewPayment(principal?: number, rate?: number, numberOfPayments?: number) {
        const r = this._getCompoundedRate(rate);
        const pvFactor = (numberOfPayments || this.numberOfPayments) * ((r * 12) * 10);
        return (principal || this.principal) / pvFactor;
    }
}

export class CreditCard {
    name: string;
    principal: number;
    rate: number;
    payment: number;
    principalOverTime: number[];
    interestsOverTime: number[];
    lifeExpectancy: number;
    age: number;
    recurrentExpenses: number;
    totalInterestPaid: number | undefined;
    constructor(
        name: string,
        principal: number,
        rate: number,
        payment: number,
        age: number,
        lifeExpectancy?: number,
        recurrentExpenses?: number
    ) {
        this.name = name;
        this.principal = principal;
        this.rate = rate;
        this.payment = payment;
        this.principalOverTime = [];
        this.interestsOverTime = [];
        this.age = age;
        this.lifeExpectancy = lifeExpectancy || 82;
        this.recurrentExpenses = recurrentExpenses || 0;
        this._pay();
        this.totalInterestPaid = this._getTotalInterests();
    }

    _addToPrincipal(expense: number) {
        return this.principal += expense;
    }

    _calculateInterest(principal: number) {
        return principal * (this.rate / 100);
    }

    _pay() {
        let principal = this.principal;
        for (let i = this.age; i < (this.lifeExpectancy * 12); i++) {
            this._addToPrincipal(this.recurrentExpenses);
            if (principal > 0) {
                const i = this._calculateInterest(principal);
                this.interestsOverTime.push(i);
                principal = (principal + i) - this.payment;
                this.principalOverTime.push(((principal + i) - this.payment) < 0 ? 0 : principal);
            }
        }
    }

    _getTotalInterests() {
        if (this.interestsOverTime.length) return this.interestsOverTime.reduce((acc, val) => acc + val);
    }

}

export class Personal {
    name: string;
    principal: number;
    rate: number;
    payment: number;
    numberOfPayments: number;
    principalOverTime: number[];
    interestsOverTime: number[];
    totalInterestPaid: number;
    constructor(
        name: string,
        principal: number,
        rate: number,
        payment: number,
        numberOfPayments: number
    ) {
        this.name = name;
        this.principal = principal;
        this.rate = rate;
        this.payment = payment;
        this.numberOfPayments = numberOfPayments;
        this.principalOverTime = [];
        this.interestsOverTime = this._interests();
        this.totalInterestPaid = this._getTotalInterests();
    }

    _calculateInterest(principal: number) {
        return principal * (this.rate / 1000);
    }

    _interests() {
        const interests: number[] = [];
        let p = 0;
        let interest = this._calculateInterest(p);//?
        for (let i = 0; i < this.numberOfPayments; i++) {
            if (p >= 0) {
                p = ((p || this.principal) + interest) - this.payment;
                interest = this._calculateInterest(p);//?
                interests.push((interest < 0) ? 0 : interest);
                this.principalOverTime.push((p < 0) ? 0 : p);
            }
        }
        return interests;
    }

    _getTotalInterests() {
        return this.interestsOverTime.reduce((acc, val) => acc + val);
    }
}