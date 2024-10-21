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
 * @param {*} pickedNumber 
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
    
    return choice;
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
    
    console.log("** Test computer choice");
    const comChoice = getComputerChoice(); 
    console.log("Computer plays:", correspondingGameByNumber(comChoice));
}