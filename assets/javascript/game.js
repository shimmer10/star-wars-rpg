
$(document).ready(function () {

    // div elements
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
    var heroCharacter = "";
    var opponentCharacter = "";

    // heros
    lukeDiv.on("click", function () {
        if (!heroCharacter) {
            heroCharacter = "luke";
            lukeDiv.appendTo(heroDiv);
            console.log("hero: " + heroCharacter);
        }
    });
    reyDiv.on("click", function () {
        if (!heroCharacter) {
            heroCharacter = "rey";
            reyDiv.appendTo(heroDiv);
        }
    });
    hanSoloDiv.on("click", function () {
        if (!heroCharacter) {
            heroCharacter = "hanSolo";
            hanSoloDiv.appendTo(heroDiv);
        }
    });
    yodaDiv.on("click", function () {
        if (!heroCharacter) {
            heroCharacter = "yoda";
            yodaDiv.appendTo(heroDiv);
        }
    });

    // opponents
    darthVaderDiv.on("click", function () {
        if (!opponentCharacter) {
            opponentCharacter = "darthVader";
            darthVaderDiv.appendTo(opponentDiv);
            console.log("opponent: " + opponentCharacter);
        }
    });
    kyloRenDiv.on("click", function () {
        if (!opponentCharacter) {
            opponentCharacter = "kyloRen";
            kyloRenDiv.appendTo(opponentDiv);
        }
    });
    darthMaulDiv.on("click", function () {
        if (!opponentCharacter) {
            opponentCharacter = "darthMaul";
            darthMaulDiv.appendTo(opponentDiv);
        }
    });
    senatorPalpatineDiv.on("click", function () {
        if (!opponentCharacter) {
            opponentCharacter = "senatorPalpatine";
            senatorPalpatineDiv.appendTo(opponentDiv);
        }
    });

    //checking too early
    // // check if hero and oponent have been chosen
    // if (heroCharacter && opponentCharacter) {
    //     console.log("made it here")
    //     enableAttack();
    // }

    attackButtonDiv.on("click", function () {
        // attack code
    });

    clearButtonDiv.on("click", function () {
        returnCardToStage(heroDiv, heroCharacter, opponentDiv, opponentCharacter);
        heroDiv.empty();
        opponentDiv.empty();
        heroCharacter = "";
        opponentCharacter = "";
        console.log("hero: " + heroCharacter);
        console.log("opponent: " + opponentCharacter);
    });

    function enableAttack() {
        $(".btn-danger").removeAttr('disabled');
    }
    function returnCardToStage(heroDiv, heroCharacter, opponentDiv, opponentCharacter) {
        // reset heros
        if (heroCharacter === "luke") {
            newDiv = $("<div>");
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

        // reset opponents
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