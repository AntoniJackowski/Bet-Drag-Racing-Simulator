export class Bet {
    #id;
    #members;
    #wallet;

    #DOMrenderBetAmount;
    #DOMrenderBetPrizes;
    #DOMrenderBetDuty;
    #DOMrenderBetWinClear;
    #DOMpageBtnStart;

    #betAmount;
    #betWinClear;

    #selectedMember = null;
    
    constructor(id, members, wallet, DOMrenderBetAmount, DOMrenderBetPrizes, DOMrenderBetDuty, DOMrenderBetWinClear, DOMpageBtnStart) {
        this.#id = id;
        this.#members = members;
        this.#wallet = wallet;
        this.#DOMrenderBetAmount = DOMrenderBetAmount;
        this.#DOMrenderBetPrizes =DOMrenderBetPrizes;
        this.#DOMrenderBetDuty = DOMrenderBetDuty;
        this.#DOMrenderBetWinClear = DOMrenderBetWinClear;
        this.#DOMpageBtnStart = DOMpageBtnStart;
        this.#init();
    };
    
    #init() {
        this.#toogleMembersListener();
        this.#handleEmptyBetAmount(this.#DOMrenderBetAmount.value);
        ['change', 'keyup'].forEach((event) => {
            this.#DOMrenderBetAmount.addEventListener(event, (e) => { 
                this.#handleValidBetAmount(e.target.value);
                this.#handleEmptyBetAmount(e.target.value);
                e.target.value < 1 ? this.#fieldsRender(0) : this.#fieldsRender(e.target.value);
                this.#betAmount = this.#DOMrenderBetAmount.value;
                this.#betWinClear = this.#getBetWinClear(this.#betAmount);
            });
        });
        if(this.#selectedMember == null) {
            this.#DOMrenderBetAmount.disabled = true;
            this.#DOMrenderBetAmount.value = null;
        };
    };
    
    #toogleMembersListener() {        
        this.#members.forEach((member, index, members) => {
            member.getDOMrenderId().addEventListener('click', () => {
                if(member.getIsSelected()) {
                    this.#fieldsRender(0);
                    this.#DOMrenderBetAmount.value = null;
                    member.removeSelect();
                    this.#selectedMember = null;
                    this.#handleBetAmountDisabled();               
                    return;
                };
                members.forEach((_member) => _member.removeSelect());
                member.addSelect();
                this.#selectedMember = member;
                this.#fieldsRender(this.#DOMrenderBetAmount.value);
                this.#handleBetAmountDisabled();
            });
        });
    };

    #getBetPrizes(value) {
        return value * this.#selectedMember.getChances();
    };

    #getBetDuty(value) {
        return (this.#getBetPrizes(value) - value) * 0.12;
    };

    #getBetWinClear(value) {
        return this.#getBetPrizes(value) - value - this.#getBetDuty(value);
    };

    #displayFormat(value) {
        return `${Number(value).toFixed(2)} ${this.#wallet.getCurrency()}`
    };

    #fieldsRender(value) {
        this.#DOMrenderBetPrizes.textContent = this.#displayFormat(this.#getBetPrizes(value));
        this.#DOMrenderBetDuty.textContent = this.#displayFormat(this.#getBetDuty(value));
        this.#DOMrenderBetWinClear.textContent = this.#displayFormat(this.#getBetWinClear(value));
    };

    #handleBetAmountDisabled() {
        this.#DOMrenderBetAmount.disabled = this.#selectedMember === null;
    };
    
    #handleValidBetAmount(value) {
        this.#DOMpageBtnStart.disabled = value < 1;
    };

    #handleEmptyBetAmount(value) {
        // this.#DOMpageBtnStart.disabled = value === '';
        this.#DOMpageBtnStart.disabled = !value;
    };

    getBetAmountValue() {
        return Number(this.#DOMrenderBetAmount.value);
    };

    getSelectedMember() {
        return this.#selectedMember;
    };

    getBetAmount() {
        return Number(this.#betAmount);
    };

    getBetWinClear() {
        return this.#betWinClear;
    };

    clearSelectedMember() {
        this.selectedMember = null;
        this.#members.forEach((member) => {
            member.removeSelect();
        })
    };
};
