export default class Ghost {
  scene: HTMLElement;
  clone: HTMLElement;
  ghost: HTMLElement | null;
  face: HTMLElement | null;
  eyes: HTMLElement | null;
  leftEye: HTMLElement | null;
  rightEye: HTMLElement | null;
  mouth: HTMLElement | null;
  mouthState: string;
  shadow: HTMLElement | null;
  leftCheek: HTMLElement | null;
  rightCheek: HTMLElement | null;
  leftHand: HTMLElement | null;
  rightHand: HTMLElement | null;
  isEscaping: boolean;
  activityInterval: number | null;

  constructor(el: HTMLElement) {
    this.scene = el;
    this.clone = el.cloneNode(true) as HTMLElement;
    this.isEscaping = false;
    this.ghost = el.querySelector('.ghost');
    this.face = el.querySelector('.ghost-face');
    this.eyes = el.querySelector('.eyes-row');
    this.leftEye = this.eyes?.querySelector('.left') || null;
    this.rightEye = this.eyes?.querySelector('.right') || null;
    this.mouth = el.querySelector('.mouth');
    this.mouthState = 'neutral';
    this.shadow = el.querySelector('.shadow-container');
    this.leftCheek = el.querySelector('.left.cheek');
    this.rightCheek = el.querySelector('.right.cheek');
    this.leftHand = el.querySelector('.hand-left');
    this.rightHand = el.querySelector('.right-hand');
    this.activityInterval = null;
  }

  reset() {
    this.scene.remove();
    this.scene = this.clone.cloneNode(true) as HTMLElement;
    this.resetRefs();
    this.scene.classList.remove('stars-out');
    this.scene.style.position = 'fixed';
    this.scene.style.left = `${(Math.random() * (window.innerWidth - 140)) / window.innerWidth * 100}%`;
    this.scene.style.top = `${(Math.random() * (window.innerHeight - 110)) / window.innerHeight * 100}%`
    this.scene.classList.add('descend');
    this.shadow?.classList.add('disappear');
    document.querySelector('body')?.append(this.scene);
    this.enter();
  
  }

  resetRefs() {
    this.ghost = this.scene.querySelector('.ghost');
    this.face = this.scene.querySelector('.ghost-face');
    this.eyes = this.scene.querySelector('.eyes-row');
    this.leftEye = this.eyes?.querySelector('.left') || null;
    this.rightEye = this.eyes?.querySelector('.right') || null;
    this.mouth = this.scene.querySelector('.mouth');
    this.mouthState = 'neutral';
    this.isEscaping = false;
    this.shadow = this.scene.querySelector('.shadow-container');
    this.leftCheek = this.scene.querySelector('.left.cheek');
    this.rightCheek = this.scene.querySelector('.right.cheek');
    this.leftHand = this.scene.querySelector('.hand-left');
    this.rightHand = this.scene.querySelector('.right-hand');
  }

  blink() {
    this.leftEye?.classList.add('blink');
    this.rightEye?.classList.add('blink');
    setTimeout(() => {
      this.leftEye?.classList.remove('blink');
      this.rightEye?.classList.remove('blink');
    }, 50);
  }

  wave() {      
    this.leftHand?.classList.add('waving');
    setTimeout(() => {
      this.leftHand?.classList.remove('waving');
    }, 500);
  }

  openMouth() {
    this.mouth?.classList.remove('closed');
    this.mouth?.classList.add('open');
    this.mouthState = 'open';
  }

  closeMouth() {
    this.mouth?.classList.remove('open');
    this.mouth?.classList.add('closed');
    this.mouthState = 'closed';
  }

  neutralMouth() {
    this.mouth?.classList.remove('open');
    this.mouth?.classList.remove('closed');
    this.mouthState = 'neutral';
  }

  hover() {
    this.ghost?.classList.add('hover');
  }

  surprise() {
    this.face?.classList.add('surprised');
  }

  runAway() {
    clearInterval(this.activityInterval!);
    if (!this.isEscaping) {
      this.isEscaping = true;
      this.scene.classList.add('run-away', 'move-stars-in');
      this.scene.classList.remove('stars-out');
      setTimeout(() => {
        this.shadow?.classList.add('disappear');
        setTimeout(
          () => {
            this.reset();
          },
          Math.floor(Math.random() * 1000) + 500
        );
      }, 450);
    }
  }

  enter() {
    setTimeout(() => {
      this.shadow?.classList.remove('disappear');
    }, 5);
    setTimeout(() => {
      this.scene.classList.remove('descend');
      this.scene.classList.add('stars-out', 'move-stars-out');
    }, 600);
    setTimeout(() => {
      this.hover();
      this.prepareEscape();
      this.startActivity();
    }, 1200);
  }

  startActivity() {
    this.activityInterval = setInterval(() => {
      switch (Math.floor(Math.random() * 4)) {
        case 0:
          this.blink();
          setTimeout(() => {
            this.blink();
          }, 400);
          setTimeout(() => {
            this.blink();
          }, 1300);
          break;
        case 1:
          this.wave();
          break;
        default:
          break;
      }
    }, 7000);
  }

  prepareEscape() {
    this.scene.addEventListener('click', () => {
      this.runAway();
    });
    this.scene.addEventListener('mouseover', () => {
      this.runAway();
    });
    this.scene.addEventListener('focus', () => {
      this.runAway();
    });
  }
}
