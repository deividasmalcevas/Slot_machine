const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const spinButton = document.getElementById('spinButton');
const resultDisplay = document.getElementById('result');

const symbols = ['🍒', '🍋', '🍉', '🍇', '🍓', '🍍'];

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function animateReel(reel, duration) {
    return new Promise((resolve) => {
        let startTime = Date.now();
        let frame = 0;

        function updateReel() {
            frame++;
            const topSymbol = getRandomSymbol();
            const middleSymbol = getRandomSymbol();
            const bottomSymbol = getRandomSymbol();

            reel.querySelector('.top').textContent = topSymbol;
            reel.querySelector('.middle').textContent = middleSymbol;
            reel.querySelector('.bottom').textContent = bottomSymbol;

            const elapsedTime = Date.now() - startTime;
            const progress = elapsedTime / duration;

            // Gradually slow down the animation
            const speed = Math.max(50, 300 - 250 * progress); // Minimum interval of 50ms

            if (elapsedTime < duration) {
                setTimeout(updateReel, speed);
            } else {
                resolve(middleSymbol);
            }
        }

        updateReel();
    });
}

async function spinReels() {
    resultDisplay.textContent = 'Good Luck!';

    // Animate each reel for a random duration between 1.5 and 2.5 seconds
    const [finalSymbol1, finalSymbol2, finalSymbol3] = await Promise.all([
        animateReel(reel1, 1500 + Math.random() * 1000),
        animateReel(reel2, 1500 + Math.random() * 1000),
        animateReel(reel3, 1500 + Math.random() * 1000)
    ]);

    // Check the result and update the message accordingly
    if (finalSymbol1 === finalSymbol2 && finalSymbol2 === finalSymbol3) {
        resultDisplay.textContent = 'Jackpot! 🎉';
    } else if (finalSymbol1 === finalSymbol2 || finalSymbol2 === finalSymbol3 || finalSymbol1 === finalSymbol3) {
        resultDisplay.textContent = 'You win! 😊';
    } else {
        resultDisplay.textContent = 'Try again! 😞';
    }
}

spinButton.addEventListener('click', spinReels);