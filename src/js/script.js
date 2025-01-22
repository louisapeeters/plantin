import "../css/reset.css";
import "../css/style.css";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";


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

const timeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.night',
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: true,
    },
});

timeline
    .fromTo(
        attackers,
        { y: '100%', autoAlpha: 0 },
        { y: '0%', autoAlpha: 1, duration: 1 }
    )
    .to(paragraph1, {
        duration: 0.5,
        text: { value: '', scrambleText: true },
        onComplete: () => {
            paragraph1.style.display = 'none';
            paragraph2.style.display = 'block';
        },
    })
    .fromTo(
        paragraph2,
        { autoAlpha: 0, text: { value: '' } },
        {
            autoAlpha: 1,
            duration: 2,
            text: { value: paragraph2.innerHTML, scrambleText: true },
        },
        '<' 
    )
    .to(plantinSmall, { autoAlpha: 0, duration: 0.1 })
    .set(plantinSmall, { display: 'none' }) 
    .set(plantinBeaten, { display: 'block' }) 
    .to(plantinBeaten, { autoAlpha: 1, duration: 0.5 }) 


// document.addEventListener('DOMContentLoaded', () => {
//     const plantinSmall = document.querySelector('.plantinSmall');
//     const plantinBeaten = document.querySelector('.plantinBeaten');
//     const attackers = document.querySelector('.attackers');
//     const paragraph1 = document.querySelector('.paragraph1');
//     const paragraph2 = document.querySelector('.paragraph2');

//     const timeline = gsap.timeline({
//         scrollTrigger: {
//             trigger: '.night',
//             start: 'top top',
//             end: '+=300%',
//             pin: true,
//             scrub: true,
//         },
//     });

//     timeline
//         .fromTo(
//             attackers,
//             { y: '100%', autoAlpha: 0 },
//             { y: '0%', autoAlpha: 1, duration: 1 } 
//         )
//         .add(() => {
//             paragraph1.style.display = 'none'; // Hide paragraph1
//             paragraph2.style.display = 'block'; // Show paragraph2
//             plantinSmall.style.display = 'none'; // Hide small Plantin
//             plantinBeaten.style.display = 'block'; // Show beaten Plantin
//         })
//         .to(plantinBeaten, { autoAlpha: 1, duration: 0.5 }) // Fade in beaten Plantin
//         .to(attackers, { autoAlpha: 0, duration: 0.5 }); // Fade out attackers
// });

document.addEventListener("DOMContentLoaded", () => {
    const house = document.querySelector(".house");
    const houseOpening = document.querySelector(".house__opening");

    houseOpening.addEventListener("click", () => {
        house.classList.add("active");
    });
});

