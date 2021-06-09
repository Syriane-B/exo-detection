// Create Scene
const heightScreen = 700;
const widthScreen = 400;
const root = document.getElementById('root');
root.style.display = 'flex';
root.style.justifyContent = 'center';
root.style.alignItems = 'center';
const screen = document.createElement('div');
screen.style.position = "relative";
screen.style.width = `${widthScreen}px`;
screen.style.height = `${heightScreen}px`;
screen.style.border = "solid 1px black";
screen.style.background = "linear-gradient(to bottom, #94c5f8 1%,#a6e6ff 70%,#b1b5ea 100%)";
screen.style.overflow = "hidden";

// Create the platform
let marginAroundPlateform = 30;
const heightPlatform = 20;
const platforms = [
  { top: 80, left: 10, width: 45 },
  { top: 150, left: 30, width: 45 },
  { top: 220, left: 50, width: 45 },
  { top: 290, left: 70, width: 45 },
  { top: 360, left: 90, width: 45 },
  { top: 430, left: 110, width: 45 },
  { top: 80, right: 10, width: 45 },
  { top: 150, right: 30, width: 45 },
  { top: 220, right: 50, width: 45 },
  { top: 290, right: 70, width: 45 },
  { top: 360, right: 90, width: 45 },
  { top: 430, right: 110, width: 45 },

];

function createPlatorm(d) {
  const pf = document.createElement('div');
  pf.style.position = "absolute";
  pf.style.top = `${d.top}px`;
  if (d.left) pf.style.left = `${d.left}px`
    else pf.style.right = `${d.right}px`;
  pf.style.width = `${d.width}px`;
  pf.style.height = `${heightPlatform}px`;
  pf.style.backgroundColor = 'grey';
  pf.style.border = "2px solid black";
  return pf;
}

// Create Tonneau
class Tonneau {
  constructor(x) {
    this.posX = x;
    this.posY = 0;
    this.intervalID = 0;
    // Create tonneau
    this.t = document.createElement('div');
    this.t.style.position = "absolute";
    this.t.style.top = `${this.posY}px`;
    this.t.style.left = `${this.posX}px`;
    this.t.style.width = "30px";
    this.t.style.height = "22px";
    this.t.style.backgroundColor = "brown";
    this.t.style.border = "1px solid black";
    this.t.style.borderRadius = "8px";
    this.t.style.transition = 'background-color ease 0.5s';
    this.initialization();
  }

  initialization = () => {
    this.intervalID = setInterval(() => {
      this.posY += 5;
      this.t.style.top = `${this.posY}px`;
      this.detectionSurface();
    }, 50);
  }

  getT() {
    return this.t;
  }


  detectionSurface = () => {
    // pour chaque plateforme
    for (let i = 0; i < platforms.length; i++) {
      // definition du mini et du maxi de la position left du tonneau en fonction de la plateform a gauche ou droite
      let plateformLeft;
      let plateformRight;
      if (platforms[i].left) {
        plateformLeft = parseInt(platforms[i].left) - marginAroundPlateform;
        plateformRight = parseInt(platforms[i].left) + (parseInt(platforms[i].width) - parseInt(this.t.style.width) + marginAroundPlateform);
      } else {
        plateformLeft = widthScreen - platforms[i].right - parseInt(platforms[i].width) - marginAroundPlateform;
        plateformRight = widthScreen - parseInt(platforms[i].right) - parseInt(this.t.style.width) + marginAroundPlateform;
      }
      // Si le tonneau est aligné avec la plateforme
      if (plateformLeft < parseInt(this.posX) && parseInt(this.posX) < plateformRight) {
        // si le tonneau touche la plateforme, on arrête sa chute
        if (parseInt(this.t.style.top) + parseInt(this.t.style.height) + 5 >= platforms[i].top) {
          this.t.style.backgroundColor = Math.floor(Math.random()*16777215).toString(16);
          clearInterval(this.intervalID);
          //easter Egg
          this.t.addEventListener('click', () => {
            this.t.style.backgroundColor = 'rgba(1,1,1,0)';
          })
        }
      }
    }
  }
}

function generateTonneau() {
  setInterval(() => {
    const randomX = Math.floor(Math.random() * widthScreen);
    const newT = new Tonneau(randomX);
    screen.appendChild(newT.getT());
  }, 2000);
}

// Append the platform
platforms.forEach(d => screen.appendChild(createPlatorm(d)))
root.appendChild(screen);

// Generate Tonneaux
generateTonneau();

