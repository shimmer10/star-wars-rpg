
$(document).ready(function () {

    // div elements
    var cardDiv = $(".card");
    var heroDiv = $("#hero");
    var opponentDiv = $("#opponent");
    var lukeDiv = $("#luke");
    var reyDiv = $("#rey");
    var hanSoloDiv = $("#han-solo");
    var yodaDiv = $("#yoda");
    var darthVaderDiv = $("#darth-vader");
    var kyloRenDiv = $("#kylo-ren");
    var darthMaulDiv = $("#darth-maul");
    var senatorPalpatineDiv = $("#senator-palpatine");
    var attackButtonDiv = $("#attack-button");
    var clearButtonDiv = $("#clear-button");

    // variables
    var heroArray = ["luke", "rey", "hanSolo", "yoda"];
    var heroCharacter = "";
    var heroHitPoints = 0;
    var attackPower = 6;
    var opponentArray = ["darthVader", "kyloRen", "darthMaul", "senatorPalpatine"];
    var opponentCharacter = "";
    var opponentHitPoints = 0;
    var counterAttackPower = 6;

    var attackButtonHit = false;

    buildHeros();
    buildOpponents();

    function buildHeros() {
        lukeDiv.on("click", function () {
            if (!heroCharacter) {
                heroCharacter = "luke";
                heroHitPoints = 240;
                lukeDiv.appendTo(heroDiv);
                checkAttackButton();
                console.log("hero: " + heroCharacter);
            }
        });
        reyDiv.on("click", function () {
            if (!heroCharacter) {
                heroCharacter = "rey";
                heroHitPoints = 250;
                reyDiv.appendTo(heroDiv);
                checkAttackButton()
            }
        });
        hanSoloDiv.on("click", function () {
            if (!heroCharacter) {
                heroCharacter = "hanSolo";
                heroHitPoints = 230;
                hanSoloDiv.appendTo(heroDiv);
                checkAttackButton()
            }
        });
        yodaDiv.on("click", function () {
            if (!heroCharacter) {
                heroCharacter = "yoda";
                heroHitPoints = 300;
                yodaDiv.appendTo(heroDiv);
                checkAttackButton()
            }
        });
    }

    function buildOpponents() {
        darthVaderDiv.on("click", function () {
            if (!opponentCharacter) {
                opponentCharacter = "darthVader";
                opponentHitPoints = 240;
                darthVaderDiv.appendTo(opponentDiv);
                checkAttackButton()
            }
        });
        kyloRenDiv.on("click", function () {
            if (!opponentCharacter) {
                opponentCharacter = "kyloRen";
                opponentHitPoints = 250;
                kyloRenDiv.appendTo(opponentDiv);
                checkAttackButton()
            }
        });
        darthMaulDiv.on("click", function () {
            if (!opponentCharacter) {
                opponentCharacter = "darthMaul";
                opponentHitPoints = 230;
                darthMaulDiv.appendTo(opponentDiv);
                checkAttackButton()
            }
        });
        senatorPalpatineDiv.on("click", function () {
            if (!opponentCharacter) {
                opponentCharacter = "senatorPalpatine";
                opponentHitPoints = 300;
                senatorPalpatineDiv.appendTo(opponentDiv);
                checkAttackButton()
            }
        });
    }


    attackButtonDiv.on("click", function () {
        attackButtonHit = true;
        if (heroHitPoints > 0 && opponentHitPoints > 0) {
            // hero attacks
            var heroAttack = (Math.floor(Math.random() * attackPower) + 1);
            opponentHitPoints = opponentHitPoints - heroAttack;
            attackPower = attackPower + 6;
            if (opponentHitPoints < 0) {
                var index = opponentArray.indexOf(opponentCharacter);
                if (index !== -1) {
                    opponentArray.splice(index, 1);
                }
                opponentCharacter = "";
                opponentDiv.empty();
                if (opponentArray === undefined || opponentArray.length == 0) {
                    //fully lost
                    console.log("fully lost");
                }
            }

            // opponent attacks
            var opponentAttack = (Math.floor(Math.random() * counterAttackPower) + 1);
            heroHitPoints = heroHitPoints - opponentAttack;
            if (heroHitPoints < 0) {
                //lose fucntionality
                console.log("you lose");
            }
            console.log("opponent hit points: " + opponentHitPoints);
            console.log("hero hit points: " + heroHitPoints);
        }
    });

    clearButtonDiv.on("click", function () {
        if (!attackButtonHit) {
            resetHero(heroDiv, heroCharacter);
            resetOpponent(opponentDiv, opponentCharacter)
            heroDiv.empty();
            opponentDiv.empty();
            heroCharacter = "";
            opponentCharacter = "";
        }
    });

    // check if hero and opponent have been chosen
    function checkAttackButton() {
        if (heroCharacter && opponentCharacter) {
            console.log("made it here")
            enableAttack();
        }
    };

    function enableAttack() {
        attackButtonDiv.removeAttr('disabled');
    }

    function resetHero(heroDiv, heroCharacter) {
        if (heroCharacter === "luke") {
            newDiv = $("<div>");
            newDiv.attr("id", "luke");
            heroDiv.clone().appendTo(newDiv);
            newDiv.appendTo($("#luke-card"));
        }
        if (heroCharacter === "rey") {
            newDiv = $("<div>");
            heroDiv.clone().appendTo(newDiv);
            newDiv.appendTo($("#rey-card"));
        }
        if (heroCharacter === "hanSolo") {
            newDiv = $("<div>");
            heroDiv.clone().appendTo(newDiv);
            newDiv.appendTo($("#han-solo-card"));
        }
        if (heroCharacter === "yoda") {
            newDiv = $("<div>");
            heroDiv.clone().appendTo(newDiv);
            newDiv.appendTo($("#yoda-card"));
        }
    }
    function resetOpponent(opponentDiv, opponentCharacter) {
        if (opponentCharacter === "darthVader") {
            newDiv = $("<div>");
            opponentDiv.clone().appendTo(newDiv);
            newDiv.appendTo($("#darth-vader-card"));
        }
        if (opponentCharacter === "kyloRen") {
            newDiv = $("<div>");
            opponentDiv.clone().appendTo(newDiv);
            newDiv.appendTo($("#kylo-ren-card"));
        }
        if (opponentCharacter === "darthMaul") {
            newDiv = $("<div>");
            opponentDiv.clone().appendTo(newDiv);
            newDiv.appendTo($("#darth-maul-card"));
        }
        if (opponentCharacter === "senatorPalpatine") {
            newDiv = $("<div>");
            opponentDiv.clone().appendTo(newDiv);
            newDiv.appendTo($("#senator-palpatine-card"));
        }
    }
});