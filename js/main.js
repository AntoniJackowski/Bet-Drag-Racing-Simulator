import * as DOM from './elements.js';

DOM.pageBtnStart.addEventListener('click', () => {
    DOM.pageHome.classList.add('page--disabled');
    DOM.pageRace.classList.remove('page--disabled');
});

DOM.pageBtnExit.addEventListener('click', () => {
    DOM.pageHome.classList.remove('page--disabled');
    DOM.pageRace.classList.add('page--disabled');
});