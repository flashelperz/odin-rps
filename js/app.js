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
 * Main Method to start the game
 * 
 * The game is in `5 rounds` and user plays 
 * against the `computer`
 */
function playGame() {
    console.clear();
    showWelcome();
}