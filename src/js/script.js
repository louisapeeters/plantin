import "../css/reset.css";
import "../css/style.css";

import { DotLottie } from '@lottiefiles/dotlottie-web';
import cryingJson from "../animations/crying.json?url";
import antwerpJson from "../animations/antwerp.json?url";
import parisJson from "../animations/paris.json?url";
import signJson from "../animations/sign.json?url";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";

new DotLottie({
    autoplay: true,
    loop: true,
    canvas: document.querySelector(".title__baby canvas"),
    src: cryingJson,
});

new DotLottie({
    autoplay: true,
    loop: true,
    canvas: document.querySelector(".house__sign canvas"),
    src: signJson,
});

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


// const ring = document.querySelector('.antwerp__interaction img');
// const hand = document.querySelector('.antwerp__img');
// const marriedHand = document.querySelector('.antwerp__img + picture');
// const instructions = document.querySelector('.instructions');

// ring.setAttribute('draggable', true);

// const isTouchDevice = () => {
//     return (('ontouchstart' in window) ||
//         (navigator.maxTouchPoints > 0) ||
//         (navigator.msMaxTouchPoints > 0));
// }

// const handleStartDrag = e => {
//     const isTouchScreen = e.touches !== undefined;
//     console.log('handleStartDrag', isTouchScreen, e);
//     window.addEventListener('touchmove', handleDragMove);
//     window.addEventListener('mousemove', handleDragMove);
//     window.addEventListener('touchend', handleStopDrag);
//     window.addEventListener('mouseup', handleStopDrag);
// };
// const handleDragMove = e => {
//     const isTouchScreen = e.touches !== undefined;
//     console.log('handleDragMove', isTouchScreen, e);
//     // todo: position the drag image
// };
// const handleStopDrag = e => {
//     const isTouchScreen = e.touches !== undefined;
//     console.log('handleStopDrag', isTouchScreen, e);
//     // todo: check if it is positioned on top of the hand
//     window.removeEventListener('touchmove', handleDragMove);
//     window.removeEventListener('mousemove', handleDragMove);
//     window.removeEventListener('touchend', handleStopDrag);
//     window.removeEventListener('mouseup', handleStopDrag);
// };

// const isTouchScreen = isTouchDevice();

// ring.addEventListener('touchstart', handleStartDrag);
// ring.addEventListener('mousedown', handleStartDrag);


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
    console.log('handleStartDrag', isTouchScreen, e);
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
    console.log('handleStopDrag', isTouchScreen, e);

    const ringRect = ring.getBoundingClientRect();
    const handRect = hand.getBoundingClientRect();
    if (
        ringRect.left < handRect.right &&
        ringRect.right > handRect.left &&
        ringRect.top < handRect.bottom &&
        ringRect.bottom > handRect.top
    ) {
        console.log('Ring dropped on the hand!');

        hand.style.display = 'none'; 
        marriedHand.style.display = 'block'; 
        ring.style.display = 'none';

        martina.style.opacity = '1';
        moretus.style.opacity = '1';

    } else {
        console.log('Ring dropped outside. Resetting position.');
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

// ring.addEventListener('dragstart', function (e) {
//     e.dataTransfer.setData('text/plain', 'ring');

//     const dragImage = ring.cloneNode(true);
//     dragImage.style.position = 'absolute';
//     dragImage.style.zIndex = '9999';

//     dragImage.style.width = `${ring.offsetWidth}px`;
//     dragImage.style.height = `${ring.offsetHeight}px`;

//     document.body.appendChild(dragImage);
//     e.dataTransfer.setDragImage(dragImage, 30, 30);

//     console.log(dragImage);

//     setTimeout(() => {
//         document.body.removeChild(dragImage);
//     }, 0);

//     ring.style.opacity = '0';
// });

// ring.addEventListener('dragend', function () {
//     ring.style.opacity = '1';
// });

// hand.addEventListener('dragover', function (e) {
//     e.preventDefault();
// });

// hand.addEventListener('drop', function (e) {
//     e.preventDefault();
//     const data = e.dataTransfer.getData('text/plain');

//     if (data === 'ring') {
//         ring.style.display = 'none';

//         hand.style.display = 'none';
//         marriedHand.style.display = 'block';

//         instructions.textContent = "You have successfully married them!";
//     }
// });

// let isDragging = false;

// ring.addEventListener('touchstart', function (e) {
//     e.preventDefault();
//     isDragging = true;

//     const touch = e.touches[0];
//     ring.style.position = 'absolute';
//     ring.style.zIndex = '9999';
//     ring.style.opacity = '0.5';
//     ring.style.left = `${touch.clientX - ring.offsetWidth / 2}px`;
//     ring.style.top = `${touch.clientY - ring.offsetHeight / 2}px`;
// });

// ring.addEventListener('touchmove', function (e) {
//     if (!isDragging) return;

//     const touch = e.touches[0];
//     ring.style.left = `${touch.clientX - ring.offsetWidth / 2}px`;
//     ring.style.top = `${touch.clientY - ring.offsetHeight / 2}px`;
// });

// ring.addEventListener('touchend', function (e) {
//     isDragging = false;

//     const touch = e.changedTouches[0];
//     const dropX = touch.clientX;
//     const dropY = touch.clientY;

//     const handRect = hand.getBoundingClientRect();

//     if (
//         dropX >= handRect.left &&
//         dropX <= handRect.right &&
//         dropY >= handRect.top &&
//         dropY <= handRect.bottom
//     ) {
//         ring.style.display = 'none';
//         hand.style.display = 'none';
//         marriedHand.style.display = 'block';
//         instructions.textContent = "You have successfully married them!";
//     } else {
//         ring.style.position = 'static';
//         ring.style.opacity = '1';
//     }
// });




gsap.registerPlugin(ScrollTrigger, TextPlugin);

const plantinSmall = document.querySelector('.plantinSmall');
const plantinBeaten = document.querySelector('.plantinBeaten');
const attackers = document.querySelector('.attackers');
const paragraph1 = document.querySelector('.paragraph1');
const paragraph2 = document.querySelector('.paragraph2');

const isLargeScreen = window.innerWidth >= 768;

// Attackers animation based on screen size
const attackersAnimation = gsap.timeline({
    scrollTrigger: {
        trigger: '.night',
        start: isLargeScreen ? 'center center' : 'top top',  
        end: '+=300%',
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











// const singleBlack = document.querySelector('.single__black');
// const singleColour = document.querySelector('.single__colour');

// let circles = []; // Array to store the positions of the circles

// singleBlack.addEventListener('mousemove', (event) => {
//     const { offsetX, offsetY } = event;
//     const width = singleBlack.offsetWidth;
//     const height = singleBlack.offsetHeight;

//     // Convert mouse position to percentages
//     const xPercent = (offsetX / width) * 100;
//     const yPercent = (offsetY / height) * 100;

//     // Add the new circle to the array
//     circles.push(`circle(4% at ${xPercent}% ${yPercent}%)`);

//     // Combine all circles into a single clip-path
//     singleColour.style.clipPath = circles.join(', ');
//     singleColour.style.opacity = 1; // Ensure the color image is visible
// });


const singleBlack = document.querySelector('.single__black');
const singleColour = document.querySelector('.single__colour');
const canvas = document.querySelector('.single__canvas');
const ctx = canvas.getContext('2d');

// Set canvas size to match the black-and-white image
canvas.width = singleBlack.offsetWidth;
canvas.height = singleBlack.offsetHeight;

// Initialize the canvas as transparent
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Handle mouse movement over the black-and-white image
singleBlack.addEventListener('mousemove', (event) => {
    const { offsetX, offsetY } = event;

    // Draw a semi-transparent white circle on the canvas
    ctx.globalCompositeOperation = 'source-over'; // Default blending mode
    ctx.beginPath();
    ctx.arc(offsetX, offsetY, 20, 0, Math.PI * 2); // Adjust circle size as needed
    ctx.fillStyle = 'white'; // Semi-transparent white
    ctx.fill();
    ctx.closePath();

    // Update the mask for the color image
    updateMask();
});

function updateMask() {
    // Convert the canvas to a data URL and apply it as a mask for the color image
    const mask = canvas.toDataURL();
    singleColour.style.maskImage = `url(${mask})`;
    singleColour.style.webkitMaskImage = `url(${mask})`; // For Webkit browsers
}









gsap.to(".death__sheet", {
    scrollTrigger: {
        trigger: ".death img",
        start: "bottom bottom",
        endTrigger: ".death__sheet",
        end: "top top",
        pin: ".death img",
        pinSpacing: false,
        scrub: true,
    },
});

gsap.to(".death img", {
    scrollTrigger: {
        trigger: ".death__sheet",
        start: "top bottom",
        end: "top center",
        scrub: true,
    },
    filter: "grayscale(100%)",
});

gsap.to(".death img", {
    scrollTrigger: {
        trigger: ".death__sheet",
        start: "top bottom",
        end: "top center",
        scrub: true,
    },
    opacity: 0,
    transition: "opacity 1s ease",
});

// gsap.registerPlugin(ScrollTrigger);

// gsap.to(".death__img--death", {
//     opacity: 1,
//     scrollTrigger: {
//         trigger: ".death__sheet",
//         start: "top center", // Adjust as needed
//         end: "bottom center", // Adjust as needed
//         scrub: true,
//         markers: true,
//     },
// });

// gsap.to(".death__img--sleeping", {
//     opacity: 0,
//     scrollTrigger: {
//         trigger: ".death__sheet",
//         start: "top center", // Adjust as needed
//         end: "bottom center", // Adjust as needed
//         scrub: true,
//         markers: true,
//     },
// });










