import * as utils from "./../utils.js";

export class Game {
    #bets;
    #wallet;
    #members;
    #defaultRaceTime = 10;
    #betsWinner = [];

    #DOMpageHome;
    #DOMpageRace;
    #DOMrenderRaceTrack;
    #DOMrenderResultTitle;
    #DOMrenderPageBtnExit;
    #DOMrenderStatisticsWin;
    #DOMrenderStatisticsLose;
    #DOMrenderBetAmount;

    #winCounter = this.getLocalStorage('winCounter');
    #loseCounter = this.getLocalStorage('loseCounter');

    #isRaceActiveClass = 'track__item--running';
    #isGameActive = false;
    #timeOut;

    constructor(bets, wallet, members, DOMpageHome, DOMpageRace, DOMrenderRaceTrack, DOMrenderResultTitle, DOMrenderPageBtnExit, DOMrenderstatisticsWin, DOMrenderstatisticsLose, DOMrenderBetAmount) {
        this.#bets = bets;
        this.#wallet = wallet;
        this.#members = members;

        this.#DOMpageHome = DOMpageHome;
        this.#DOMpageRace = DOMpageRace;
        this.#DOMrenderRaceTrack = DOMrenderRaceTrack; 
        this.#DOMrenderResultTitle = DOMrenderResultTitle;
        this.#DOMrenderPageBtnExit = DOMrenderPageBtnExit;
        this.#DOMrenderStatisticsWin = DOMrenderstatisticsWin;
        this.#DOMrenderStatisticsLose = DOMrenderstatisticsLose;
        this.#DOMrenderBetAmount = DOMrenderBetAmount;

        this.#DOMrenderStatisticsWin.textContent = this.#winCounter;
        this.#DOMrenderStatisticsLose.textContent = this.#loseCounter;
    };

    start() {
        this.#DOMpageHome.classList.add("page--disabled");
        this.#DOMpageRace.classList.remove("page--disabled");

        this.#isGameActive = true;
        this.#DOMrenderPageBtnExit.disabled = true;

        const sumBetsAmountValues = this.#bets.reduce(
            (accumulator, bet) => accumulator + bet.getBetAmountValue(),
            0
        );
        this.#wallet.modifyAmount(-sumBetsAmountValues);

        this.#DOMrenderRaceTrack.forEach((element) => {
            element.classList.add(this.#isRaceActiveClass);
        });

        const raceTimes = [];
        this.#bets.forEach((bet) => {
            this.#members.forEach((member, index) => {
                const raceTime = this.#calcRaceTime(member.getChances());
                this.#DOMrenderRaceTrack[index].style.animationDuration = `${raceTime}s`;
                this.#DOMrenderRaceTrack[index].style.animationTimingFunction = this.#getRandomCubicBezier();
                raceTimes.push(raceTime);
            }); 
            const winnerIndex = raceTimes.indexOf(Math.min(...raceTimes));
            this.#betsWinner.push(winnerIndex);
            this.#members[winnerIndex].setAsWinner();
        });
        const maxRaceTimeout = Math.max(...raceTimes) * 1000;

        this.#timeOut = setTimeout(() => {
            this.finish();
        }, maxRaceTimeout);

    };

    finish() {
        this.#DOMrenderPageBtnExit.disabled = false;

        this.#bets.forEach((bet) => {
            const selectedMember = bet.getSelectedMember();
            const isWinner = selectedMember.getIsWinner();
            if (isWinner) {
                this.#wallet.modifyAmount(bet.getBetAmount() + bet.getBetWinClear());
                this.#DOMrenderResultTitle.textContent = "WYGRAŁEŚ";
                this.#winCounter++;
                this.setLocalStorage('winCounter', this.#winCounter);
                this.#DOMrenderStatisticsWin.textContent = this.#winCounter;

            } else {
                this.#DOMrenderResultTitle.textContent = "PRZEGRAŁEŚ";
                this.#loseCounter++;
                this.setLocalStorage('loseCounter', this.#loseCounter);
                this.#DOMrenderStatisticsLose.textContent = this.#loseCounter;
            };
        });
        
    };

    end() {
        this.#DOMpageHome.classList.remove("page--disabled");
        this.#DOMpageRace.classList.add("page--disabled");

        this.#isGameActive = false;
        this.#members.forEach((member) => {
            member.getData();
        });
        utils.setMemberChances(this.#members[0], this.#members[1]);
        this.#betsWinner = [];
        this.#DOMrenderResultTitle.textContent = null;

        this.#DOMrenderBetAmount.forEach((item) => {
            item.value = null;
        });

        this.#bets.forEach((item) => {
            item.clearSelectedMember();
        });
    };

    #getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    #getRandomCubicBezier() {
        const arg1 = this.#getRandomFloat(0, 1);
        const arg2 = this.#getRandomFloat(0, 1);
        const arg3 = this.#getRandomFloat(0, 1);
        const arg4 = this.#getRandomFloat(0, 1);
        return `cubic-bezier(${arg1}, ${arg2}, ${arg3}, ${arg4})`
    }

    #calcRaceTime(chances) {
        const baseTime = this.#defaultRaceTime - (this.#defaultRaceTime / (chances * 2));
        const timeDifference = Math.abs(this.#members[0].getChances() - this.#members[1].getChances());
        return baseTime + this.#getRandomFloat(0, timeDifference + 1/timeDifference);
    };

    setLocalStorage(key, value) {
        localStorage.setItem(key, value);
    };

    getLocalStorage(key) {
        if (localStorage.getItem(key) != null) {
            console.log(key, 'true');
            return localStorage.getItem(key);
        } else {
            console.log(key, 'false');
            return 0;
        };
    };

    setWinCounter(value) {
        this.#winCounter = value;
        this.setLocalStorage('winCounter', this.#winCounter);
        this.#DOMrenderStatisticsWin.textContent = this.#winCounter;
    };

    setLoseCounter(value) {
        this.#loseCounter = value;
        this.setLocalStorage('loseCounter', this.#loseCounter);
        this.#DOMrenderStatisticsLose.textContent = this.#loseCounter;
    };
 
    getTimeOut() {
        return this.#timeOut;
    };
}