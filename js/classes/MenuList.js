import * as DOM from "./../elements.js";

export class MenuList {
    static clearLocalStorage(game, wallet) {
        Swal.fire({
            title: 'Czy na pewno?',
            text: "Czy na pewno chcesz zresetować grę?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Nie',
            confirmButtonText: 'Tak, zresetuj!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Zresetowano!',
                        'Twoja gra została przywrócona do początkowego stanu.',
                        'success'
                    );
                    game.setWinCounter(0);
                    game.setLoseCounter(0);
                    wallet.setAmount(1500);
                    clearTimeout(game.getTimeOut());
                    game.end();
                };
            });    
        }; 
    
    static showDefaultAlert() {
        Swal.fire({
            title: 'Przepraszamy',
            text: 'Nie dodaliśmy jeszcze takiej funkcji',
            icon: 'info',
            confirmButtonText: 'Rozumiem',
            confirmButtonColor: '#000'
        });
    };

    static changeSoundItemValue(value) {
        const soundItem = DOM.menuListItems.find((item) => item.attributes["data-list-item"].value === '2');
        value 
            ? soundItem.innerHTML = '<i class="bi bi-volume-up-fill"></i>Wyłącz muzykę'
            : soundItem.innerHTML = '<i class="bi bi-volume-mute-fill"></i>Włącz muzykę';
    };
};