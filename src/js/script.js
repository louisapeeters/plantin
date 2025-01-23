import "../css/reset.css";
import "../css/style.css";

// import { DotLottie } from '@lottiefiles/dotlottie-web';

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";



// new DotLottie({
//     autoplay: true,
//     loop: true,
//     canvas: document.querySelector(".title__heart"),
//     src: "..animations/heart.json",
// });


const ring = document.querySelector('.antwerp__interaction img');
const hand = document.querySelector('.antwerp__img');
const marriedHand = document.querySelector('.antwerp__img + picture');
const instructions = document.querySelector('.instructions');

ring.setAttribute('draggable', true);

ring.addEventListener('dragstart', function (e) {
    e.dataTransfer.setData('text/plain', 'ring');

    const dragImage = ring.cloneNode(true);
    dragImage.style.position = 'absolute';
    dragImage.style.zIndex = '9999';

    dragImage.style.width = `${ring.offsetWidth}px`;
    dragImage.style.height = `${ring.offsetHeight}px`;

    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 30, 30);

    setTimeout(() => {
        document.body.removeChild(dragImage);
    }, 0);

    ring.style.opacity = '0';
});

ring.addEventListener('dragend', function () {
    ring.style.opacity = '1';
});

hand.addEventListener('dragover', function (e) {
    e.preventDefault();
});

hand.addEventListener('drop', function (e) {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');

    if (data === 'ring') {
        ring.style.display = 'none';

        hand.style.display = 'none';
        marriedHand.style.display = 'block';

        instructions.textContent = "You have successfully married them!";
    }
});

let isDragging = false;

ring.addEventListener('touchstart', function (e) {
    e.preventDefault();
    isDragging = true;

    const touch = e.touches[0];
    ring.style.position = 'absolute';
    ring.style.zIndex = '9999';
    ring.style.opacity = '0.5';
    ring.style.left = `${touch.clientX - ring.offsetWidth / 2}px`;
    ring.style.top = `${touch.clientY - ring.offsetHeight / 2}px`;
});

ring.addEventListener('touchmove', function (e) {
    if (!isDragging) return;

    const touch = e.touches[0];
    ring.style.left = `${touch.clientX - ring.offsetWidth / 2}px`;
    ring.style.top = `${touch.clientY - ring.offsetHeight / 2}px`;
});

ring.addEventListener('touchend', function (e) {
    isDragging = false;

    const touch = e.changedTouches[0];
    const dropX = touch.clientX;
    const dropY = touch.clientY;

    const handRect = hand.getBoundingClientRect();

    if (
        dropX >= handRect.left &&
        dropX <= handRect.right &&
        dropY >= handRect.top &&
        dropY <= handRect.bottom
    ) {
        ring.style.display = 'none'; 
        hand.style.display = 'none'; 
        marriedHand.style.display = 'block'; 
        instructions.textContent = "You have successfully married them!";
    } else {
        ring.style.position = 'static';
        ring.style.opacity = '1';
    }
});



gsap.registerPlugin(ScrollTrigger, TextPlugin);

const plantinSmall = document.querySelector('.plantinSmall');
const plantinBeaten = document.querySelector('.plantinBeaten');
const attackers = document.querySelector('.attackers');
const paragraph1 = document.querySelector('.paragraph1');
const paragraph2 = document.querySelector('.paragraph2');

gsap.timeline({
    scrollTrigger: {
        trigger: '.night',
        start: 'top top',
        end: '+=300%',
        pin: true,  
        scrub: true, 
    },
})
    .fromTo(
        attackers,
        {
            y: window.innerHeight +100, 
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

gsap.timeline({
    scrollTrigger: {
        trigger: attackers,
        start: 'top 10%', 
        end: 'bottom center', 
        scrub: true,  
    },
})
    .to(plantinSmall, { autoAlpha: 0, duration: 0 }, '+=0.3') 
    .set(plantinSmall, { display: 'none' }) 
    .set(plantinBeaten, { display: 'block' }) 
    .to(plantinBeaten, { autoAlpha: 1, duration: 0.5 }, '+=0.3'); 

ScrollTrigger.create({
    trigger: attackers,
    start: 'top 75%',
    end: 'top 60%',
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




document.addEventListener("DOMContentLoaded", () => {
    const house = document.querySelector(".house");
    const houseOpening = document.querySelector(".house__opening");

    houseOpening.addEventListener("click", () => {
        house.classList.add("active");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const antwerp = document.querySelector(".raid__antwerp");
    const paris = document.querySelector(".raid__paris");

    antwerp.classList.add("visible");

    antwerp.addEventListener("click", () => {
        antwerp.classList.remove("visible");
        paris.classList.add("visible");
        antwerp.style.display = "none";
        paris.style.display = "flex";
    });

    paris.addEventListener("click", () => {
        paris.classList.remove("visible");
        antwerp.classList.add("visible");
        paris.style.display = "none"; 
        antwerp.style.display = "flex";
    });
});








const singleBlack = document.querySelector('.single__black');
const singleColour = document.querySelector('.single__colour');

singleBlack.addEventListener('mousemove', (event) => {
    const { offsetX, offsetY } = event;
    const width = singleBlack.offsetWidth;
    const height = singleBlack.offsetHeight;

    const xPercent = offsetX / width * 100;
    const yPercent = offsetY / height * 100;

    singleColour.style.opacity = 1; 
    singleColour.style.clipPath = `circle(4% at ${xPercent}% ${yPercent}%)`; 
});






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










