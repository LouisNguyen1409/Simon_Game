const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];
let level = 0;

$("h1").text("Press A Key to Start");

const nextSequence = () => {
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("h1").text(`Level ${level}`);
    level++;
};

const handler = (event) => {
    const userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
};

$(".btn").click(handler);

const playSound = (name) => {
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
};

animatePress = (currentColour) => {
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(() => {
        $(`#${currentColour}`).removeClass("pressed");
    }, 100);
};

$(document).keydown(() => {
    if (gamePattern.length === 0) {
        nextSequence();
    }
});

const checkAnswer = (currentLevel) => {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
            userClickedPattern.length = 0;
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

const startOver = () => {
    gamePattern.length = 0;
    userClickedPattern.length = 0;
    level = 0;
}

