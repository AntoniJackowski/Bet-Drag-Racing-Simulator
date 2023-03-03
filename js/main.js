import { MenuList } from "./classes/MenuList.js";
import { Bet } from "./classes/Bet.js";
import { Game } from "./classes/Game.js";
import { Member } from "./classes/Member.js";
import { Wallet } from "./classes/Wallet.js";
import * as DOM from "./elements.js";
import * as utils from "./utils.js";

const onInit = () => {

    DOM.menuBtn.addEventListener('click', () => {
        DOM.menuList.classList.toggle('menu__list--visible');
    });

    const wallet = new Wallet(1500, "zł", DOM.statisticsCash);

    wallet.renderAmount();

    const members = [];
    const membersIds = [];
    DOM.driversOptionIds.forEach((item) => {
        const optionIdValue = item.attributes["data-option-id"].value;

        if (membersIds.length === 0) {
            membersIds.push(optionIdValue);
        } else if (!membersIds.includes(optionIdValue)) {
            membersIds.push(optionIdValue);
        }
    });

    membersIds.forEach((memberId) => {
        const memberIndex = memberId-1;
        const member = new Member(
            memberId,
            DOM.driversOptionIds[memberIndex],
            DOM.driversOptionNames[memberIndex],
            DOM.driversOptionPhotos[memberIndex],
            DOM.driversOptionFlags[memberIndex],
            DOM.driversOptionCountries[memberIndex],
            DOM.driversOptionChances[memberIndex],
            DOM.driversOptionSpinners[memberIndex],

            DOM.driversRacePhotos[memberIndex],
            DOM.driversRaceNames[memberIndex],
            DOM.driversRaceFlags[memberIndex],
            DOM.driversRaceCountries[memberIndex]
        );
        member.getData();
        members.push(member);
    });
    utils.setMemberChances(members[0], members[1]);

    const bets = [];

    DOM.bets.forEach((item, index) => {
        const bet = new Bet(
            item.attributes['data-bet'].value,
            members,
            wallet,
            DOM.betsAmounts[index],
            DOM.betsPrizes[index],
            DOM.betsDuty[index],
            DOM.betsWinClear[index],
            DOM.pageBtnStart
        );
        bets.push(bet);
    });

    const game = new Game(
        bets,
        wallet,
        members,
        DOM.pageHome,
        DOM.pageRace,
        DOM.raceTrack,
        DOM.resultTitle,
        DOM.pageBtnExit,
        DOM.statisticsWin,
        DOM.statisticsLose,
        DOM.betsAmounts
    );

    DOM.menuListItems.forEach((item) => {
        item.addEventListener('click', () => {
            const itemIndex = item.attributes["data-list-item"].value;
            switch(itemIndex){
                case '1':
                    MenuList.clearLocalStorage(game, wallet);
                    break;
    
                default:
                    MenuList.showDefaultAlert();
                    break;
            };
        });
    });

    DOM.pageBtnStart.addEventListener("click", () => {
        game.start();
    });

    DOM.pageBtnExit.addEventListener("click", () => {
        game.end();
    });
};

onInit();