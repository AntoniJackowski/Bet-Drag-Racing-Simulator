export class Wallet {
    amount;
    currency;
    DOMrenderAmount;

    constructor(amount, currency, DOMrenderAmount) {
        this.amount = amount;
        this.currency = currency;
        this.DOMrenderAmount = DOMrenderAmount;
    };

    modifyAmount(value) {
        this.amount += value;
        this.renderAmount();
    };

    setAmount(value) {
        this.amount = value;
        this.renderAmount();
    };

    renderAmount() {
        this.DOMrenderAmount.textContent = `${this.amount} ${this.currency}`;
    };
};