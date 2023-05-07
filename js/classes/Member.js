export class Member {
    #id;
    #name;
    #surname;
    #photo;
    #country;
    #nat;
    #flag;
    #chances;

    #DOMrenderId;
    #DOMrenderName;
    #DOMrenderPhoto;
    #DOMrenderFlag;
    #DOMrenderCountry;
    #DOMrenderChances;
    #DOMrenderSpinner;

    #DOMrenderRacePhotos;
    #DOMrenderRaceNames;
    #DOMrenderRaceFlags;
    #DOMrenderRaceCountries;

    #isLoading = false;
    #isLoadgingActiveClass = 'option__spinner--is-loading';

    #isSelected = false;
    #isSelectedActiceClass = 'drivers__option--is-selected';

    #isWinner = false;

    constructor(
        id,
        DOMrenderId,
        DOMrenderName,
        DOMrenderPhoto,
        DOMrenderFlag,
        DOMrenderCountry,
        DOMrenderChances,
        DOMrenderSpinner,

        DOMrenderRacePhotos,
        DOMrenderRaceNames,
        DOMrenderRaceFlags,
        DOMrenderRaceCountries,
    ) {
        this.#id = id;
        this.#DOMrenderId = DOMrenderId;
        this.#DOMrenderName = DOMrenderName;
        this.#DOMrenderPhoto = DOMrenderPhoto;
        this.#DOMrenderFlag = DOMrenderFlag;
        this.#DOMrenderCountry = DOMrenderCountry;
        this.#DOMrenderChances = DOMrenderChances;
        this.#DOMrenderSpinner = DOMrenderSpinner;

        this.#DOMrenderRacePhotos = DOMrenderRacePhotos;
        this.#DOMrenderRaceNames = DOMrenderRaceNames;
        this.#DOMrenderRaceFlags = DOMrenderRaceFlags;
        this.#DOMrenderRaceCountries = DOMrenderRaceCountries;
    }

    getData() {
        this.#isLoading = true;
        this.#DOMrenderSpinner.classList.add(this.#isLoadgingActiveClass);
        fetch('https://randomuser.me/api')
            .then((response) => response.json())
            .then((data) => {
                this.#isLoading = false;
                this.#DOMrenderSpinner.classList.remove(this.#isLoadgingActiveClass);
                const result = data.results[0];
                this.#name = result.name.first;
                this.#surname = result.name.last;
                this.#photo = result.picture.large;
                this.#country = result.location.country;
                this.#nat = result.nat;
                this.#flag = `https://www.countryflagicons.com/FLAT/32/${this.#nat}.png`;
                this.#renderData();
            })
            .catch((error) => {
                console.log('error', error);
            });
    }

    #renderData() {
        this.#DOMrenderName.textContent = `${this.#name} ${this.#surname}`;
        this.#DOMrenderPhoto.src = this.#photo;
        this.#DOMrenderFlag.src = this.#flag;
        this.#DOMrenderCountry.textContent = this.#country;
        this.#DOMrenderChances.textContent = this.#chances;

        this.#DOMrenderRacePhotos.src = this.#photo;
        this.#DOMrenderRaceNames.textContent = `${this.#name} ${this.#surname}`;
        this.#DOMrenderRaceFlags.src = this.#flag;
        this.#DOMrenderRaceCountries.textContent = this.#country;
    }

    // toogleSelect() {
    //     this.#isSelected ? (this.#isSelected = false) : (this.#isSelected = true);
    //     this.#DOMrenderId.classList.toggle(this.#isSelectedActiceClass);
    // }

    addSelect() {
        this.#isSelected = true;
        this.#DOMrenderId.classList.add(this.#isSelectedActiceClass);
    }

    removeSelect() {
        this.#isSelected = false;
        this.#DOMrenderId.classList.remove(this.#isSelectedActiceClass);
    }

    getIsSelected() {
        return this.#isSelected;
    }

    setChances(value) {
        this.#chances = value;
        this.#DOMrenderChances.textContent = this.#chances;
    }

    getDOMrenderId() {
        return this.#DOMrenderId;
    }

    getChances() {
        return Number(this.#chances);
    }

    setAsWinner() {
        this.#isWinner = true;
    }

    setAsLoser() {
        this.#isWinner = false;
    }

    getIsWinner() {
        return this.#isWinner;
    }

    setIsSelectedActiceClass(value) {
        this.#isSelectedActiceClass = value;
    }

    removeClass(value) {
        this.#DOMrenderId.classList.remove(value);
    }
}
