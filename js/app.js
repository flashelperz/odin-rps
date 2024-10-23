let isPlaying = false,
    userScore = 0,
    roundsToPlay = 5,
    nberOfDraws = 0,
    comScore = 0;

document.getElementById('#devTool')?.addEventListener(
    'click', () => {
        const shouldStart = isPlaying ? confirm("Restart the game ? (The score will be reset)") : confirm("Start a new game ?");

        if (shouldStart) {
            initGameData();
            playGame();
        }
    }
)

/**
 * Initialize game data
 */
function initGameData() {
    isPlaying = true;
    userScore = 0;
    comScore = 0;
    roundsToPlay = 5;
    nberOfDraws = 0;

    console.clear();
    showWelcome();
}

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
        nberOfDraws += 1;
        console.log("\n\t\t*********** Draw game ***********\n");
        return;
    }

    const isUserWon = (uChoice === 'rock' && comChoice === 'scissors')
        || (uChoice === 'scissors' && comChoice === 'paper')
        || (uChoice === 'paper' && comChoice === 'rock');

    if (isUserWon) {
        userScore += 1; // Only user(human player) score is incremented
        console.log(`\n\t\t*********** You win! ${uChoice} beats ${comChoice} ***********\n`);
        return;
    }

    comScore += 1; // Only computer score is incremented
    console.log(`\n\t\t*********** You lose! ${comChoice} beats ${uChoice} ***********\n`);
    return;
}

/**
 * Main Method to start the game,
 * the method will call itselt whenever user's haven't reach
 * the `rounds playing` limit
 * 
 * The game is in `specific rounds` and user plays 
 * against the `computer`
 * 
 * @see roundsToPlay for the default number of rounds
*/
function playGame() {
    roundsToPlay -= 1;

    console.groupCollapsed("Playing Round");

    // User game
    console.log("** Game for user");
    const uChoice = getHumanChoice();
    console.log("You play:", uChoice);

    // Com game
    console.log("** Game for computer");
    const comChoice = getComputerChoice();
    console.log("Computer plays:", comChoice);

    // PlayRound
    playRound(uChoice, comChoice);

    console.groupEnd();

    if (roundsToPlay > 0) {
        return playGame();
    }

    console.log(`\n\t\t*********** Scores: User: ${userScore} | Computer: ${comScore} | Draw(s): ${nberOfDraws} ***********\n`);
    if(userScore > comScore) {
        console.log(`\n\n\t\t*********** You win! ***********\n`);
    }else if(userScore < comScore) {
        console.log(`\n\n\t\t*********** You lose! ***********\n`);
    }else {
        console.log(`\n\n\t\t*********** Draw Game! ***********\n`);
    }
    isPlaying = false; // the game is over
}