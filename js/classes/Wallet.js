export class Wallet {
    #amount;
    #currency;
    #DOMrenderAmount;

    constructor(amount, currency, DOMrenderAmount) {
        if (this.getLocalStorage() != null) {
            this.#amount = Number(this.getLocalStorage());
        } else {
            this.#amount = amount;
        };
        this.#currency = currency;
        this.#DOMrenderAmount = DOMrenderAmount;
    };

    modifyAmount(value) {
        this.#amount += value;
        this.renderAmount();
        this.setLocalStorage();
    };

    setAmount(value) {
        this.#amount = value;
        this.renderAmount();
        this.setLocalStorage();
    };

    renderAmount() {
        this.#DOMrenderAmount.textContent = `${this.#amount.toFixed(2)} ${this.#currency}`;
    };

    getCurrency() {
        return this.#currency;
    };

    setLocalStorage() {
        localStorage.setItem('amount', this.#amount);
    };

    getLocalStorage() {
        return localStorage.getItem('amount');
    };
};