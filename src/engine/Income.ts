export class IncomeDetails {
    gross: number;
    provincialTax: number;
    federalTax: number;
    qpp: number;
    qpip: number;
    ei: number;
    net: number;
    details: [
        {gross: number},
        {net: number},
        {provincialTax: number},
        {federalTax: number},
        {EI: number},
        {QPP: number},
        {QPIP: number}
    ]
    constructor(gross: number) {
        this.gross = gross;
        this.provincialTax = this._provincialTax();
        this.federalTax = this._federalTax();
        this.qpp = this._qpp();
        this.qpip = this._qpip();
        this.ei = this._ei();
        this.net = this._net();
        this.details = [
            { gross: this.gross },
            { net: this.net },
            { provincialTax: this.provincialTax },
            { federalTax: this.federalTax },
            { EI: this.ei },
            { QPP: this.qpp },
            { QPIP: this.qpip }
        ]
    }

    _getQCBaseAmount() {
        return 15532;
    }

    _getFederalBaseAmount() {
        return 13229;
    }

    _provincialTax() {

      /*$43,790 or less	15%
        More than $43,790 but not more than $87,575	20%
        More than $87,575 but not more than $106,555	24%
        More than $106,555	25.75% */
        const brackets = { 
            one: [44545, 15 / 100],
            two: [89080, 20 / 100],
            three: [108390, 24 / 100],
            four: [108391, 25.75 / 100],
        }

        let amountToTax = this.gross - this._getQCBaseAmount();
        let tax = 0;

        if (amountToTax < brackets.one[0]) {
            tax += (amountToTax * brackets.one[1]);
        }

        if (amountToTax < brackets.two[0] && amountToTax > brackets.one[0]) {
            tax += (brackets.one[0] * brackets.one[1]);
            tax += ((amountToTax - brackets.one[0]) * brackets.two[1]);
        }

        if (amountToTax < brackets.three[0] && amountToTax > brackets.two[0]) {
            tax += (brackets.one[0] * brackets.one[1]);
            tax += (brackets.two[0] * brackets.two[1]);
            tax += ((amountToTax - brackets.two[0]) * brackets.three[1]);
        }

        if (amountToTax >= brackets.four[0]) {
            tax += (brackets.one[0] * brackets.one[1]);
            tax += (brackets.two[0] * brackets.two[1]);
            tax += (brackets.three[0] * brackets.three[1]);
            tax += ((amountToTax - brackets.three[0]) * brackets.four[1]);
        }

        if (this.gross <= this._getQCBaseAmount()) {
            tax = 0;
        }

        return tax;
    }

    _federalTax() {
        /*15% on the first $48,535 of taxable income, plus
          20.5% on the next $48,534 of taxable income (on the portion of taxable income over 48,535 up to $97,069), plus
          26% on the next $53,404 of taxable income (on the portion of taxable income over $97,069 up to $150,473), plus
          29% on the next $63,895 of taxable income (on the portion of taxable income over 150,473 up to $214,368), plus
          33% of taxable income over $214,368*/
        const brackets = { 
            one: [48535, 15 / 100],
            two: [97069, 20.5 / 100],
            three: [150473, 26 / 100],
            four: [214368, 29 / 100],
            five: [214369, 33 / 100]
        }

        let amountToTax = this.gross - this._getFederalBaseAmount();
        let tax = 0;

        if (amountToTax < brackets.one[0]) {
            tax += (amountToTax * brackets.one[1]);
        }

        if (amountToTax < brackets.two[0] && amountToTax > brackets.one[0]) {
            tax += (brackets.one[0] * brackets.one[1]);
            tax += ((amountToTax - brackets.one[0]) * brackets.two[1]);
        }

        if (amountToTax < brackets.three[0] && amountToTax > brackets.two[0]) {
            tax += (brackets.one[0] * brackets.one[1]);
            tax += (brackets.two[0] * brackets.two[1]);
            tax += ((amountToTax - brackets.two[0]) * brackets.three[1]);
        }

        if (amountToTax < brackets.four[0] && amountToTax > brackets.three[0]) {
            tax += (brackets.one[0] * brackets.one[1]);
            tax += (brackets.two[0] * brackets.two[1]);
            tax += (brackets.three[0] * brackets.three[1]);
            tax += ((amountToTax - brackets.three[0]) * brackets.four[1]);
        }

        if (amountToTax >= brackets.five[0]) {
            tax += (brackets.one[0] * brackets.one[1]);
            tax += (brackets.two[0] * brackets.two[1]);
            tax += (brackets.three[0] * brackets.three[1]);
            tax += (brackets.four[0] * brackets.four[1]);
            tax += ((amountToTax - brackets.four[0]) * brackets.five[1]);
        }

        if (this.gross <= this._getFederalBaseAmount()) {
            tax = 0;
        }

        return tax;
    }

    _qpp() {
        const limits = {
            maxDeduction: 3146.40,
            maxIncome: 58700,
            rate: 5.7 / 100
        }

        if (this.gross >= limits.maxIncome) return limits.maxDeduction;
        if (this.gross <= this._getQCBaseAmount()) return 0;
        return this.gross * limits.rate;
    }

    _qpip() {
        const limits = {
            maxDeduction: 387.79,
            maxIncome: 78500,
            rate: 0.494 / 100
        }

        if (this.gross >= limits.maxIncome) return limits.maxDeduction;
        if (this.gross <= this._getQCBaseAmount()) return 0;
        return this.gross * limits.rate;
    }

    _ei() {
        const limits = {
            maxDeduction: 856.36,
            maxIncome: 54200,
            rate: 1.4 / 100
        }

        if (this.gross >= limits.maxIncome) return limits.maxDeduction;
        if (this.gross <= this._getFederalBaseAmount()) return 0;
        return (this.gross * limits.rate);
    }

    _net() {
        return this.gross - (this.federalTax + this.provincialTax + this.qpp + this.qpip + this.ei)
    }
}