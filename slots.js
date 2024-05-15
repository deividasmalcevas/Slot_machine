//btns
const spinButton = document.getElementById('spinButton');
//divs
const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const resultDisplay = document.getElementById('result');
const bidAmount = document.getElementById('bidAmount');
const user_money = document.getElementById('user_money');

//vars
const symbols = ['🍒', '🍋', '🍉', '🍇', '🍓', '🍍', '🍊', '🍏', '🥝', '🍅', '🥑', '🥭', '🍑', '🥥', '🍌'];
const percentages = {
    '🍒': 1.05,
    '🍋': 1.08,
    '🍉': 2.12,
    '🍇': 1.59,
    '🍓': 1.67,
    '🍍': 3.06,
    '🍊': 1.9,
    '🍏': 2.11,
    '🥝': 1.54,
    '🍅': 4.03,
    '🥑': 1.02,
    '🥭': 1.47,
    '🍑': 1,
    '🥥': 1.95,
    '🍌': 2.05
};
let bid
//btn_clicks
spinButton.onclick = async () => {
   await Spin()
}
//initiate
user_money.textContent = get_money()

//functions
async function Spin() {
    resultDisplay.textContent = 'Good Luck!';
    bid = parseInt(bidAmount.value)
    if(bid > get_money()) return alert(`Not enough money!`)
    const [symbol1, symbol2, symbol3] = await Promise.all([
        Anim_reel(reel1, 1500 + Math.random() * 1000),
        Anim_reel(reel2, 1500 + Math.random() * 1000),
        Anim_reel(reel3, 1500 + Math.random() * 1000)
    ]);

    const winnings = Cal_wins(symbol1, symbol2, symbol3);
    if (winnings > 0) {
        resultDisplay.textContent = `You won $${winnings}! 😊`;
        update_money(winnings);
    } else {
        resultDisplay.textContent = 'Try again! 😞';
        update_money(-bid);
    }
}
function RNG_symbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}
function Cal_wins(symbol1, symbol2, symbol3, bid) {
    let winnings = 0;
    bid = parseInt(bidAmount.value)
    if (symbol1 === symbol2 && symbol2 === symbol3) {
        winnings = bid * 3 * percentages[symbol1];
    } else if (symbol1 === symbol2 || symbol2 === symbol3 || symbol1 === symbol3) {
        winnings = bid * 2 * percentages[symbol1];
    }
    return Math.round(winnings);
}
function get_money(){
    let p_money = localStorage.getItem('p_money');
    if (!p_money) {
        p_money = 10000;
        localStorage.setItem('p_money', p_money);
    }
    return p_money
}
function update_money(amount) {
    let p_money = localStorage.getItem('p_money');
    p_money = parseInt(p_money) + parseInt(amount);
    localStorage.setItem('p_money', p_money);
    user_money.textContent = p_money.toString()
}
function Anim_reel(reel, duration) {
    return new Promise((resolve) => {
        let startTime = Date.now();
        let frame = 0;

        function up_reel() {
            frame++;
            const topSymbol = RNG_symbol();
            const middleSymbol = RNG_symbol();
            const bottomSymbol = RNG_symbol();

            reel.querySelector('.top').textContent = topSymbol;
            reel.querySelector('.middle').textContent = middleSymbol;
            reel.querySelector('.bottom').textContent = bottomSymbol;

            const elapsedTime = Date.now() - startTime;
            const progress = elapsedTime / duration;

            const speed = Math.max(50, 300 - 250 * progress);

            if (elapsedTime < duration) {
                setTimeout(up_reel, speed);
            } else {
                resolve(middleSymbol);
            }
        }
        up_reel();
    });
}
