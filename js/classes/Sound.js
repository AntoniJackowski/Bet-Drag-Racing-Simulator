import { MenuList } from './MenuList.js';

export class Sound {
    static #soundList = ['./../assets/1.mp3', './../assets/2.mp3', './../assets/3.mp3'];
    static #sound;
    static isPlaying = false;
    static #musicIndex = 0;
    static #volume = 0.5;

    static play() {
        Sound.#sound = new Audio(Sound.#soundList[Sound.#musicIndex]);
        Sound.#sound.play();
        Sound.#sound.loop = true;
        Sound.#sound.autoplay = true;
        Sound.isPlaying = true;
        MenuList.changeSoundItemValue(Sound.isPlaying);
    }

    static stop() {
        Sound.#sound.pause();
        Sound.#sound.currentTime = 0;
        Sound.isPlaying = false;
        MenuList.changeSoundItemValue(Sound.isPlaying);
    }

    static pause() {
        Sound.#sound.pause();
    }

    static skip() {
        Sound.#musicIndex < Sound.#soundList.length - 1 ? Sound.#musicIndex++ : (Sound.#musicIndex = 0);

        Sound.stop();
        Sound.play();
    }

    static volume(value) {
        Sound.#volume = value;
        Sound.#sound.volume = Sound.#volume;
    }
}
