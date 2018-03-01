import $ from 'jquery';
import velocity from 'velocity-animate';

export  default class Roulette {
  constructor() {
    this.$rouletteImage = $('.roulette img');
    $('#start').on('click', ()=> {
      this.init();
    });
  }

  init() {
    this.resetRoulette();
    if (this.getValue()) {
      console.log(this.getValue());
      this.winRoulette();
    } else {
      console.log(this.getValue());
      this.loseRoulette();
    }
  }

  /**
   * あたりかハズレか判定
   * @returns {boolean|*}
   */
  getValue() {
    const array = [true, false];
    this.random = array[Math.floor(Math.random() * array.length)];
    return this.random;
  }

  /**
   * 当たりの時のアニメーション
   */
  winRoulette() {
    let resolved = false;

    velocity(this.$rouletteImage, {
      rotateZ: '+=860',
    }, {
      duration: 4000,
      easing: [.17, .99, .36, .98],
      progress: (elements, percentComplete) => {
        if (Math.round(percentComplete * 100) > 90 && !resolved) {
          resolved = true;
        }
      }
    });
  }

  /**
   * ハズレの時のルーレット
   */
  loseRoulette() {
    let progressOver = false;
    velocity(this.$rouletteImage, {
      rotateZ: '+=585',
    }, {
      duration: 4000,
      easing: [.17, .99, .36, .98],
      progress: (elements, percentComplete) => {
        if (Math.round(percentComplete * 100) > 98 && !progressOver) {
          progressOver = true;
          velocity(this.$rouletteImage, {
            rotateZ: '+=20',
          }, {
            duration: 500
          });
        }
      }
    });
  }

  resetRoulette() {
    this.$rouletteImage.css('transform', 'rotateZ(0)');
  }

}