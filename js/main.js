import { Bet } from "./classes/Bet.js";
import { Game } from "./classes/Game.js";
import { Member } from "./classes/Member.js";
import { Wallet } from "./classes/Wallet.js";
import * as DOM from "./elements.js";
import * as utils from "./utils.js";

const onInit = () => {
    console.log("ZAŁADOWANO STRONĘ!!");

    const wallet = new Wallet(1500, "zł", DOM.statisticsCash);
    const game = new Game();

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
    console.log(membersIds);

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
            DOM.driversOptionSpinners[memberIndex]
        );
        member.getData();
        // DOM.driversOptionIds[memberIndex].addEventListener('click', () => {
        //     member.toogleSelect();
        // });
        members.push(member);
    });
    utils.selectMember(DOM.driversOptionIds);
    utils.setMemberChances(members[0], members[1]);

    DOM.bets.forEach((item, index) => {
        const bet = new Bet(
            item.attributes['data-bet'].value,
            members,
            wallet,
            DOM.betsAmounts[index],
            DOM.betsPrizes[index],
            DOM.betsDuty[index],
            DOM.betsWinClear[index]
        );
    });

    DOM.pageBtnStart.addEventListener("click", () => {
        DOM.pageHome.classList.add("page--disabled");
        DOM.pageRace.classList.remove("page--disabled");
        game.start();
    });

    DOM.pageBtnExit.addEventListener("click", () => {
        DOM.pageHome.classList.remove("page--disabled");
        DOM.pageRace.classList.add("page--disabled");
        game.end();
    });
};

onInit();