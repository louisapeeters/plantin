import "../css/reset.css";
import "../css/style.css";

import { DotLottie } from '@lottiefiles/dotlottie-web';
import cryingJson from "../animations/crying.json?url";
import antwerpJson from "../animations/antwerp.json?url";
import parisJson from "../animations/paris.json?url";
import signJson from "../animations/sign.json?url";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import TextPlugin from "gsap/TextPlugin";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, TextPlugin);


const cryingAnimation = new DotLottie({
    autoplay: false,
    loop: true,
    canvas: document.querySelector(".title__baby canvas"),
    src: cryingJson,
});


const clock = document.querySelector(".subtitle__clock img");
const clockInstructions = document.querySelector(".subtitle__clock .instructions");
let clockPlaying = false;

const firstSection = document.querySelector(".birth");

const toggleAnimations = () => {
    if (clockPlaying) {
        gsap.killTweensOf(clock);
        cryingAnimation.pause();
        clockPlaying = false;
        clockInstructions.textContent = "click the clock to start the day!";
    } else {
        gsap.to(clock, {
            keyframes: [
                { rotation: -10, duration: 0.15 },
                { rotation: 10, duration: 0.3 },
                { rotation: -10, duration: 0.3 },
                { rotation: 0, duration: 0.15 }
            ],
            repeat: -1,
            ease: "none"
        });
        cryingAnimation.play();
        clockPlaying = true;
        clockInstructions.textContent = "click the clock to stop the day!";

        gsap.to(window, {
            duration: 2,
            scrollTo: {
                y: firstSection,
                offsetY: 50,
            },
            ease: "power2.inOut",
        });
    }
};

clock.addEventListener("click", toggleAnimations);



const ring = document.querySelector('.antwerp__interaction img');
const hand = document.querySelector('.antwerp__img');
const marriedHand = document.querySelector('.antwerp__img + picture');
const instructions = document.querySelector('.instructions');
const martina = document.querySelector('.antwerp__martina');
const moretus = document.querySelector('.antwerp__moretus');

const initialPosition = {
    left: ring.offsetLeft,
    top: ring.offsetTop,
};

ring.setAttribute('draggable', true);

const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

const handleStartDrag = e => {
    const isTouchScreen = e.touches !== undefined;
    window.addEventListener('touchmove', handleDragMove);
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('touchend', handleStopDrag);
    window.addEventListener('mouseup', handleStopDrag);
};
const handleDragMove = e => {
    const isTouchScreen = e.touches !== undefined;

    const pointerX = isTouchScreen ? e.touches[0].clientX : e.clientX;
    const pointerY = isTouchScreen ? e.touches[0].clientY : e.clientY;

    ring.style.position = 'absolute';
    ring.style.left = `${pointerX - ring.offsetWidth / 2}px`;
    ring.style.top = `${pointerY - ring.offsetHeight / 2}px`;

    if (isTouchScreen) {
        e.preventDefault();
    }
};

const handleStopDrag = e => {
    const isTouchScreen = e.touches !== undefined;

    const ringRect = ring.getBoundingClientRect();
    const handRect = hand.getBoundingClientRect();
    if (
        ringRect.left < handRect.right &&
        ringRect.right > handRect.left &&
        ringRect.top < handRect.bottom &&
        ringRect.bottom > handRect.top
    ) {

        hand.style.display = 'none';
        marriedHand.style.display = 'block';
        ring.style.display = 'none';

        document.querySelector('.martina__heart').style.display = 'block';
        document.querySelector('.moretus__heart').style.display = 'block';

    } else {
        ring.style.left = `${initialPosition.left}px`;
        ring.style.top = `${initialPosition.top}px`;
    }

    window.removeEventListener('touchmove', handleDragMove);
    window.removeEventListener('mousemove', handleDragMove);
    window.removeEventListener('touchend', handleStopDrag);
    window.removeEventListener('mouseup', handleStopDrag);
};



const isTouchScreen = isTouchDevice();

ring.addEventListener('touchstart', handleStartDrag);
ring.addEventListener('mousedown', handleStartDrag);


const plantinSmall = document.querySelector('.plantinSmall');
const plantinBeaten = document.querySelector('.plantinBeaten');
const attackers = document.querySelector('.attackers');
const paragraph1 = document.querySelector('.paragraph1');
const paragraph2 = document.querySelector('.paragraph2');

const isLargeScreen = window.innerWidth >= 768;

const attackersAnimation = gsap.timeline({
    scrollTrigger: {
        trigger: '.night',
        start: isLargeScreen ? 'center center' : 'top top',  
        end:'+=300%',
        pin: true,
        scrub: true,
    },
});

if (isLargeScreen) {
    attackersAnimation
        .fromTo(
            attackers,
            {
                x: window.innerWidth + 100,
                autoAlpha: 1,
            },
            {
                x: 0,
                autoAlpha: 1,
                duration: 1,
            }
        )
        .to(attackers, {
            x: '-100vw',
            autoAlpha: 0,
            duration: 1,
        });
} else {
    attackersAnimation
        .fromTo(
            attackers,
            {
                y: window.innerHeight + 100,
                autoAlpha: 1,
                rotate: 90,
            },
            {
                y: 0,
                autoAlpha: 1,
                rotate: 90,
                duration: 1,
            }
        )
        .to(attackers, {
            y: '-100vh',
            autoAlpha: 0,
            rotate: 90,
            duration: 1,
        });
}

gsap.timeline({
    scrollTrigger: {
        trigger: attackers,
        start: isLargeScreen ? 'right -50%' : 'top 10%',
        end: isLargeScreen ? 'left 150%' : 'bottom center',
        scrub: true,
    },
})
    .to(plantinSmall, { autoAlpha: 0, duration: 0 }, '+=0.3')
    .set(plantinSmall, { display: 'none' })
    .set(plantinBeaten, { display: 'block' })
    .to(plantinBeaten, { autoAlpha: 1, duration: 0.5 }, '+=0.3');

ScrollTrigger.create({
    trigger: attackers,
    start: isLargeScreen ? 'right 25%' : 'top 60%', 
    end: isLargeScreen ? 'right 30%' : 'top 40%', 
    scrub: true,
    onEnter: () => {
        gsap.to(paragraph1, {
            onComplete: () => {
                paragraph1.style.display = 'none';
                paragraph2.style.display = 'block';

                const htmlContent = paragraph2.innerHTML;
                paragraph2.innerHTML = '';

                const wrappedText = htmlContent.replace(/(<[^>]+>|[\s\S])/g, (match) => {
                    if (match.startsWith('<') && match.endsWith('>')) {
                        return match;
                    } else {
                        return `<span>${match}</span>`;
                    }
                });
                paragraph2.innerHTML = wrappedText;
                gsap.utils.toArray(paragraph2.querySelectorAll('span')).forEach((char, index) => {
                    gsap.fromTo(char, {
                        opacity: 0,
                        y: -20,
                    }, {
                        opacity: 1,
                        y: 0,
                        delay: Math.random() * 0.5,
                        duration: 0.3,
                        ease: "power1.out",
                    });
                });
            },
        });
    },
    onLeaveBack: () => {
        gsap.to(paragraph2, {
            onComplete: () => {
                paragraph2.style.display = 'none';
                paragraph1.style.display = 'block';
                gsap.to(paragraph1, { autoAlpha: 1, duration: 0.5 });
            },
        });
    },
});

const house = document.querySelector(".house");
const houseOpening = document.querySelector(".house__opening");

const handleClick = () => {
    house.classList.add("active");
};

houseOpening.addEventListener("click", handleClick);
houseOpening.addEventListener("touchstart", handleClick); 

const signCanvas = document.querySelector(".house__sign canvas");
let animationPlayed = false;

const lottieAnimation = new DotLottie({
    autoplay: false,
    loop: false,
    canvas: signCanvas,
    src: signJson,
});

const houseSignElement = document.querySelector(".house__sign");

const onElementVisible = () => {
    if (!animationPlayed) {
        lottieAnimation.play();
        animationPlayed = true;
    }
};

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                onElementVisible();
            }
        });
    },
    { threshold: 0.1 }
);

observer.observe(houseSignElement);



new DotLottie({
    autoplay: true,
    loop: true,
    canvas: document.querySelector(".antwerp__animation canvas"),
    src: antwerpJson,
});

new DotLottie({
    autoplay: true,
    loop: true,
    canvas: document.querySelector(".paris__animation canvas"),
    src: parisJson,
});

const antwerp = document.querySelector(".raid__antwerp");
const paris = document.querySelector(".raid__paris");
const antwerpSwitch = document.querySelector(".raid__antwerp .raid__switch");
const parisSwitch = document.querySelector(".raid__paris .raid__switch");

antwerp.classList.add("visible");

const toggleVisibility = (hideElement, showElement) => {
    hideElement.classList.remove("visible");
    showElement.classList.add("visible");
    hideElement.style.display = "none";
    showElement.style.display = "flex";
};

antwerpSwitch.addEventListener("click", () => toggleVisibility(antwerp, paris));
antwerpSwitch.addEventListener("touchstart", () => toggleVisibility(antwerp, paris));

parisSwitch.addEventListener("click", () => toggleVisibility(paris, antwerp));
parisSwitch.addEventListener("touchstart", () => toggleVisibility(paris, antwerp));


const TextInstructions = document.getElementById('instructions');

if ('ontouchstart' in window || navigator.maxTouchPoints) {
    TextInstructions.textContent = 'Go over the woodcuts to colour them in.';
} else {
    TextInstructions.textContent = 'Hover over the woodcuts to colour them in.';
}

function setupCanvas(blackElement, colourElement, canvasElement) {
    const ctx = canvasElement.getContext('2d');

    canvasElement.width = blackElement.offsetWidth;
    canvasElement.height = blackElement.offsetHeight;

    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    let isTouching = false;
    let lastTouchUpdate = 0;
    let maskUpdateDelay = 50;

    function draw(event) {
        let offsetX, offsetY;

        if (event.touches) {
            const touch = event.touches[0];
            const rect = canvasElement.getBoundingClientRect();
            offsetX = touch.clientX - rect.left;
            offsetY = touch.clientY - rect.top;
        } else {
            offsetX = event.offsetX;
            offsetY = event.offsetY;
        }

        ctx.globalCompositeOperation = 'source-over';
        ctx.beginPath();
        ctx.arc(offsetX, offsetY, 20, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();

        updateMask();
    }

    function updateMask() {
        const now = Date.now();

        if (now - lastTouchUpdate > maskUpdateDelay) {
            lastTouchUpdate = now;
            const mask = canvasElement.toDataURL();
            colourElement.style.maskImage = `url(${mask})`;
            colourElement.style.webkitMaskImage = `url(${mask})`;
        }
    }

    blackElement.addEventListener('mousemove', (event) => {
        draw(event);
    });

    blackElement.addEventListener('touchstart', (event) => {
        event.preventDefault();
        isTouching = true;
        draw(event);
    });

    blackElement.addEventListener('touchmove', (event) => {
        event.preventDefault();
        if (isTouching) {
            draw(event);
        }
    });

    blackElement.addEventListener('touchend', (event) => {
        event.preventDefault();
        isTouching = false;
    });
}

const singleBlack = document.querySelector('.single__black');
const singleColour = document.querySelector('.single__colour');
const singleCanvas = document.querySelector('.single__canvas');
setupCanvas(singleBlack, singleColour, singleCanvas);

const flowerBlack = document.querySelector('.flower__black');
const flowerColour = document.querySelector('.flower__colour');
const flowerCanvas = document.querySelector('.flower__canvas');
setupCanvas(flowerBlack, flowerColour, flowerCanvas);

const poppyBlack = document.querySelector('.poppy__black');
const poppyColour = document.querySelector('.poppy__colour');
const poppyCanvas = document.querySelector('.poppy__canvas');
setupCanvas(poppyBlack, poppyColour, poppyCanvas);



gsap.to(".death img", {
    scrollTrigger: {
        trigger: ".death img",
        start: "bottom bottom",
        endTrigger: ".death__sheet",
        end: "top top", 
        pin: true,
        pinSpacing: false,
        scrub: true,
    },
});

gsap.to(".death img", {
    scrollTrigger: {
        trigger: ".death__sheet",
        start: "top bottom", 
        end: "top top", 
        scrub: true,
    },
    filter: "grayscale(100%)",
});

ScrollTrigger.create({
    trigger: ".death__sheet",
    start: "top bottom",
    end: "bottom bottom",
    onUpdate: (self) => {
        const progress = self.progress;
        const isOverlapped = progress > 0.5;
        gsap.to(".death img", {
            opacity: isOverlapped ? 0 : 1, 
            duration: 0.1, 
            ease: "power1.out",
        });
    },
});



let countingStarted = false;
let sunToMoonChanged = false;
let moonToDeathChanged = false;

window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    const navbarTop = navbar.getBoundingClientRect().top;

    if (navbarTop <= 0 && !countingStarted) {
        countingStarted = true;
    }

    if (countingStarted) {
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPosition = window.scrollY;
        const newNumber = Math.max(48 - (scrollPosition / pageHeight) * 48, 0);
        document.querySelector('.navbar p').textContent = Math.round(newNumber);
    }

    const nightSection = document.querySelector('.night');
    const nightTop = nightSection.getBoundingClientRect().top;
    const nightBottom = nightSection.getBoundingClientRect().bottom;

    const deathSection = document.querySelector('.death');
    const deathTop = deathSection.getBoundingClientRect().top;
    const deathBottom = deathSection.getBoundingClientRect().bottom;

    const offset = window.innerHeight / 2; 

    if (nightTop <= offset && nightBottom >= 0 && !sunToMoonChanged) {
        sunToMoonChanged = true;
        moonToDeathChanged = false; 
        document.querySelector('.nav__sun').style.display = 'none';
        document.querySelector('.nav__moon').style.display = 'block';
    }

    if (deathTop <= offset && deathBottom >= 0 && !moonToDeathChanged) {
        moonToDeathChanged = true; 
        sunToMoonChanged = false; 
        document.querySelector('.nav__sun').style.display = 'none';
        document.querySelector('.nav__moon').style.display = 'block';
    }

    if ((nightTop > window.innerHeight || nightBottom < 0) &&
        (deathTop > window.innerHeight || deathBottom < 0) &&
        sunToMoonChanged) {
        sunToMoonChanged = false;
        moonToDeathChanged = false;
        document.querySelector('.nav__moon').style.display = 'none';
        document.querySelector('.nav__sun').style.display = 'block';
    }
});