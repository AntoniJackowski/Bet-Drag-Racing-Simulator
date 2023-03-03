export const setMemberChances = (member1, member2) => {
    const range = getRandom(4, 10);
    const chances1 = getRandom(3, range - 1.15).toFixed(2);
    const chances2 = (range - chances1).toFixed(2);
    const randomIndex = Math.round(getRandom(0, 1));

    member1.setChances(randomIndex === 0 ? chances1 : chances2);
    member2.setChances(randomIndex === 1 ? chances1 : chances2);
};

export const getRandom = (min, max) => Math.random() * (max - min) + min;