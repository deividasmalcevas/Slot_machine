const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const spinButton = document.getElementById('spinButton');
const resultDisplay = document.getElementById('result');

const symbols = ['🍒', '🍋', '🍉', '🍇', '🍓', '🍍'];

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function animateReel(reel, duration, finalSymbol) {
    return new Promise((resolve) => {
        let startTime = Date.now();
        let frame = 0;
        function updateReel() {
            frame++;
            reel.textContent = getRandomSymbol();

            const elapsedTime = Date.now() - startTime;
            const progress = elapsedTime / duration;

            // Gradually slow down the animation
            const speed = Math.max(50, 300 - 250 * progress); // Minimum interval of 50ms

            if (elapsedTime < duration) {
                setTimeout(updateReel, speed);
            } else {
                reel.textContent = finalSymbol;
                resolve();
            }
        }
        updateReel();
    });
}

async function spinReels() {
    resultDisplay.textContent = 'Good Luck!';
    let t = 2000;
    // Animate each reel for a random duration between 1 and 2 seconds
    await Promise.all([
        animateReel(reel1, t),
        animateReel(reel2, t),
        animateReel(reel3, t)
    ]);

    // Final symbols after animation
    const symbol1 = getRandomSymbol();
    const symbol2 = getRandomSymbol();
    const symbol3 = getRandomSymbol();

    reel1.textContent = symbol1;
    reel2.textContent = symbol2;
    reel3.textContent = symbol3;

    if (symbol1 === symbol2 && symbol2 === symbol3) {
        resultDisplay.textContent = 'Jackpot! 🎉';
    } else if (symbol1 === symbol2 || symbol2 === symbol3 || symbol1 === symbol3) {
        resultDisplay.textContent = 'You win! 😊';
    } else {
        resultDisplay.textContent = 'Try again! 😞';
    }
}

spinButton.addEventListener('click', spinReels);