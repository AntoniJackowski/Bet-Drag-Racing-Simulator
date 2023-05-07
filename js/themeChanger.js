const toolbar = document.querySelector('.toolbar');
const logo = document.querySelector('.toolbar__logo');
const title = document.querySelector('.toolbar__title');
const menuBtn = document.querySelector('.menu__button');
const menuList = document.querySelector('.menu__list');
let itemsBi = document.querySelectorAll('.item__bi');
const itemOutput = document.querySelector('.item__output');
const statistics = document.querySelector('.statistics');
const pages = document.querySelectorAll('.page');
const driversOptions = document.querySelectorAll('.drivers__option');
const ctas = document.querySelectorAll('.cta');
const resultTitle = document.querySelector('.result__title');

export const zseTheme = () => {
    itemsBi = document.querySelectorAll('.item__bi');

    logo.classList.remove('toolbar__logo--disabled');
    toolbar.classList.add('toolbar--zse');
    title.classList.add('toolbar__title--zse');
    menuBtn.classList.add('menu__button--zse');
    menuList.classList.add('menu__list--zse');
    itemsBi.forEach((itemBi) => {
        itemBi.classList.add('item__bi--zse');
    });
    itemOutput.classList.add('item__output--zse');
    statistics.classList.add('statistics--zse');
    pages.forEach((page) => {
        page.classList.add('page--zse');
    });
    driversOptions.forEach((driversOption) => {
        driversOption.classList.remove('drivers__option');
        driversOption.classList.add('drivers__option--zse');
    });
    ctas.forEach((cta) => {
        cta.classList.add('cta--zse');
    });
    resultTitle.classList.add('result__title--zse');
};

export const normalTheme = () => {
    itemsBi = document.querySelectorAll('.item__bi');

    logo.classList.add('toolbar__logo--disabled');
    toolbar.classList.remove('toolbar--zse');
    title.classList.remove('toolbar__title--zse');
    menuBtn.classList.remove('menu__button--zse');
    menuList.classList.remove('menu__list--zse');
    itemsBi.forEach((itemBi) => {
        itemBi.classList.remove('item__bi--zse');
    });
    itemOutput.classList.remove('item__output--zse');
    statistics.classList.remove('statistics--zse');
    pages.forEach((page) => {
        page.classList.remove('page--zse');
    });
    driversOptions.forEach((driversOption) => {
        driversOption.classList.add('drivers__option');
        driversOption.classList.remove('drivers__option--zse');
    });
    ctas.forEach((cta) => {
        cta.classList.remove('cta--zse');
    });
    resultTitle.classList.remove('result__title--zse');
};
