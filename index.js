function fromTheBeginning(){
    $(document).on("click", function(){
        startGame();
    });
};

let outroMusic = new Audio();

fromTheBeginning();

function startGame(){
    outroMusic.pause();
    outroMusic = new Audio("outro" + Math.floor(Math.random() * 7) + ".mp3");
    new Audio("game-start.mp3").play();
    $(document).off("click");
    $("header p").addClass("hide");
    let round = 1;
    $("header h1").html("Round " + round);
    let correctSequence = [Math.floor(Math.random() * 4)];
    let playerSequence = [];
    let j = 0;
    showSequence();

    function showSequence(){
        $("header h1").html("Round " + round);
        $(".color").off("click");
        let i = 0;
        setTimeout(function recursionBaby(){
            $(".flash").eq(correctSequence[i]).removeClass("show");
            $(".flash").offset();
            $(".flash").eq(correctSequence[i]).addClass("show");
            new Audio("sound" + correctSequence[i] + ".mp3").play();
            i++;
            if(i<correctSequence.length){
                setTimeout(recursionBaby, 700);
            }else{
                $(".color").on("click", addClick);
            }
        }, 700);
    }

    function addClick(){
        playerSequence.push($(this).index());
        if(playerSequence[j]!==correctSequence[j]){
            $(".color").off("click");
            new Audio("L" + Math.floor(Math.random() * 4) + ".mp3").play();
            $("header h1").html("You <mark class='red-text'>lose</mark>.");        
            setTimeout(function (){
                $("header p").html("Click anywhere to start again.");
                $("header p").removeClass("hide");
                outroMusic.play();
                fromTheBeginning();
            }, 2000);
        }else{
            new Audio("sound" + $(this).index() + ".mp3").play();
            j++;
        };
        if(playerSequence.length===correctSequence.length && playerSequence[j]===correctSequence[j]){
            new Audio("next-round.mp3").play();
            round++;
            correctSequence.push(Math.floor(Math.random() * 4));
            playerSequence = [];
            j = 0;
            showSequence();
        };
    }
}