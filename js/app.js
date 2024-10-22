let isPlaying = false;

document.getElementById('#devTool')?.addEventListener(
    'click', () => {
        const shouldStart = isPlaying ? confirm("Restart the game ? (The score will be reset)") : confirm("Start a new game ?");

        if (shouldStart) {
            isPlaying = true;
            playGame();
        }
    }
)

/**
 * Game welcome message
 */
function showWelcome() {
    const line1 = "\t\t*********** ******************* ***********\t",
        message = "\n\t\t*********** WELCOME TO RPC GAME ***********\t\n",
        line2 = "\t\t*********** =================== ***********\t\n\n";

    console.log(line1 + message + line2);
}

/**
 * Convert a picked number to it's corresponding 
 * in-game value
 * 
 * @param {number | string} pickedNumber 
 * @returns 
 */
function correspondingGameByNumber(pickedNumber) {
    const parsed = +pickedNumber;
    if (isNaN(parsed) || parsed < 0 || parsed > 2) {
        throw new Error("The picked number can only be 0, 1 or 2");
    }

    return parsed === 0
        ? 'rock'
        : parsed === 1
            ? 'paper'
            : 'scissors';
}

/**
 * This method returned the computer choice
 * randomly, the choices are:
 * `0`: for `rock`
 * `1`: for `paper`
 * `2`: for `scissors`
 * 
 * The method used there for the random choice is Math.random
 * 
 * @returns
 */
function getComputerChoice() {
    const choice = Math.floor(Math.random() * 3);

    return correspondingGameByNumber(choice);
}

/**
 * This method return the user's choice.
 * The user(human player) will be asked 
 * (using `prompt`) to enter it's choice then 
 * depending on it's answer, we'll return it's choice
 * or continuing to ask him otherwise.
 * 
 * @see getComputerChoice for choice number and their corresponding values.
 * @returns
 */
function getHumanChoice() {
    let choiceAlertDescription = 'Please enter your choice\n\n';
    choiceAlertDescription += '0: rock\n';
    choiceAlertDescription += '1: paper\n';
    choiceAlertDescription += '2: scissors';

    const choice = prompt(choiceAlertDescription);

    try {
        return correspondingGameByNumber(choice);
    } catch (error) {
        return getHumanChoice();
    }
}

/**
 * Method for playing a round and show the winner
 * 
 * @param {'rock' | 'paper' | 'scissors'} uChoice The user(human player) choice
 * @param {'rock' | 'paper' | 'scissors'} comChoice the computer choice
 */
function playRound(uChoice, comChoice) {
    if (uChoice === comChoice) {
        console.log("Draw game");
        return;
    }

    const isUserWon = (uChoice === 'rock' && comChoice === 'scissors')
        || (uChoice === 'scissors' && comChoice === 'paper')
        || (uChoice === 'paper' && comChoice === 'rock');

    if (isUserWon) {
        console.log(`You win! ${uChoice} beats ${comChoice}`);
        return;
    }

    console.log(`You lose! ${comChoice} beats ${uChoice}`);
    return;
}

/**
 * Main Method to start the game
 * 
 * The game is in `5 rounds` and user plays 
 * against the `computer`
*/
function playGame() {
    console.clear();
    showWelcome();

    // console.log("** Game for user");
    // const uChoice = getHumanChoice(); 
    // console.log("You play:", uChoice);

    // console.log("** Game for computer");
    // const comChoice = getComputerChoice();
    // console.log("Computer plays:", comChoice);
}