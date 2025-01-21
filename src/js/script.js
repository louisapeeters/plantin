import "../css/reset.css";
import "../css/style.css";

document.addEventListener('DOMContentLoaded', function () {
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

        document.body.appendChild(dragImage);
        e.dataTransfer.setDragImage(dragImage, 30, 30);

        setTimeout(() => {
            document.body.removeChild(dragImage);
        }, 0);

        ring.style.opacity = '0'; 
    });

    ring.addEventListener('dragend', function () {
        ring.style.opacity = '1'; // Restore visibility after dragging
    });

    // ring.addEventListener('touchstart', function (e) {
    //     e.preventDefault(); // Prevent default touch behavior to prioritize drag
    //     const touch = e.touches[0];
    //     const dragImage = ring.cloneNode(true);

    //     dragImage.style.position = 'absolute';
    //     dragImage.style.zIndex = '9999';
    //     dragImage.style.width = `${ring.offsetWidth}px`;
    //     dragImage.style.height = `${ring.offsetHeight}px`;

    //     document.body.appendChild(dragImage);

    //     // Position the drag image at the touch point
    //     dragImage.style.top = `${touch.clientY - ring.offsetHeight / 2}px`;
    //     dragImage.style.left = `${touch.clientX - ring.offsetWidth / 2}px`;

    //     // Remove the clone after some time
    //     setTimeout(() => {
    //         document.body.removeChild(dragImage);
    //     }, 0);

    //     ring.style.opacity = '0';
    // });

    hand.addEventListener('dragover', function (e) {
        e.preventDefault(); // Enable dropping
    });

    hand.addEventListener('drop', function (e) {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');

        if (data === 'ring') {
            ring.style.display = 'none'; // Hide the ring

            hand.style.display = 'none'; // Hide the empty hand
            marriedHand.style.display = 'block'; // Show the married hand

            instructions.textContent = "You have successfully married them!";
        }
    });
});