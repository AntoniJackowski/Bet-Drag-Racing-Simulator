export class Bet {
    #id;
    #members;
    #wallet;

    #DOMrenderBetAmount;
    #DOMrenderBetPrizes;
    #DOMrenderBetDuty;
    #DOMrenderBetWinClear;

    #selectedMember = null;
    
    constructor(id, members, wallet, DOMrenderBetAmount, DOMrenderBetPrizes, DOMrenderBetDuty, DOMrenderBetWinClear) {
        this.#id = id;
        this.#members = members;
        this.#wallet = wallet;
        this.#DOMrenderBetAmount = DOMrenderBetAmount;
        this.#DOMrenderBetPrizes =DOMrenderBetPrizes;
        this.#DOMrenderBetDuty = DOMrenderBetDuty;
        this.#DOMrenderBetWinClear = DOMrenderBetWinClear;
        this.#init();
    };
    
    #init() {
        this.#toogleMembersListener();
        ['change', 'keyup'].forEach((event) => {
            this.#DOMrenderBetAmount.addEventListener(event, (e) => {
                this.#fieldsRender(e.target.value);
            });
        });
        if(this.#selectedMember == null) {
            this.#DOMrenderBetAmount.disabled = true;
            // this.#fieldsRender(0);
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
                    return;
                };
                members.forEach((_member) => _member.removeSelect());
                member.addSelect();
                this.#selectedMember = member;
                this.#fieldsRender(this.#DOMrenderBetAmount.value);
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

};
