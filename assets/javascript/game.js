
$(document).ready(function () {

    // characters
    var luke = {
        "firstName": "Luke",
        "lastName": "Skywalker",
        "visibleHP": 240,
        "hitPoints": 240,
        "attackPower": 5,
        "status": "hero",
        "image": "./assets/images/LukeSkywalker.jpg"
    };
    var rey = {
        "firstName": "Rey",
        "lastName": "",
        "visibleHP": 250,
        "hitPoints": 250,
        "attackPower": 6,
        "status": "hero",
        "image": "./assets/images/ReyReady.png"
    };
    var hanSolo = {
        "firstName": "Han",
        "lastName": "Solo",
        "visibleHP": 230,
        "hitPoints": 230,
        "attackPower": 4,
        "status": "hero",
        "image": "./assets/images/HanSolo.jpg"
    };
    var yoda = {
        "firstName": "Yoda",
        "lastName": "",
        "visibleHP": "unknown",
        "hitPoints": 250,
        "attackPower": 7,
        "status": "hero",
        "image": "./assets/images/Yoda.jpg"
    };
    var darthVader = {
        "firstName": "Darth",
        "lastName": "Vader",
        "visibleHP": 240,
        "hitPoints": 240,
        "attackPower": 5,
        "status": "opponent",
        "image": "./assets/images/DarthVader.jpg"
    };
    var kyloRen = {
        "firstName": "Kylo",
        "lastName": "Ren",
        "visibleHP": 250,
        "hitPoints": 250,
        "attackPower": 6,
        "status": "opponent",
        "image": "./assets/images/KyloRen.jpg"
    };
    var darthMaul = {
        "firstName": "Darth",
        "lastName": "Maul",
        "visibleHP": 230,
        "hitPoints": 230,
        "attackPower": 4,
        "status": "opponent",
        "image": "./assets/images/DarthMaul.jpg"
    };
    var senatorPalpatine = {
        "firstName": "Senator",
        "lastName": "Palpatine",
        "visibleHP": "Unknown",
        "hitPoints": 300,
        "attackPower": 4,
        "status": "opponent",
        "image": "./assets/images/SenatorPalpatine.jpg"
    };


    // div elements
    var arenaDiv = $(".arena");
    var arenaHeroDiv = $("#arena-hero")
    var heroCardsDiv = $("#hero-cards");
    var arenaOpponentDiv = $("#arena-opponent");
    var opponentCardsDiv = $("#opponent-cards");
    var buttonsDiv = $("#buttons");
    var attackButton = $("#attack-button");

    // variables
    var characterArray = [luke, rey, hanSolo, yoda, darthVader, kyloRen, darthMaul, senatorPalpatine];
    var heroCharacterChosen = false;
    var heroHitPoints = 0;
    var opponentCharacterChosen = false;
    var opponentArray = [darthVader.firstName, kyloRen.firstName, darthMaul.firstName, senatorPalpatine.firstName]
    var opponentHitPoints = 0;
    var allDefeated = false;

    arenaDiv.text("Arena")
    buildCards();

    // build the character cards
    function buildCards() {
        $.each(characterArray, function () {
            var character = this;
            var status = this.status;
            var columnDiv = $("<div/>", { class: "col-lg-3" });
            if (status === "hero") {
                var cardDiv = $("<div/>", { class: "card bg-light mb-3", id: " hero " + character.hitPoints + " " + character.attackPower });
            }
            else {
                var cardDiv = $("<div/>", { class: "card  bg-dark text-white mb-3", id: "opponent " + character.hitPoints + " " + character.attackPower + " " + character.firstName });
            }
            var cardHeader = $("<div/>", { class: "card-header", text: character.firstName + " " + character.lastName });
            var cardImage = $("<img/>", { class: "card-img-top", src: character.image });
            var cardBody = $("<div/>", { class: "card-body" });
            var cardText = $("<div/>", { class: "card-footer", text: "Hit Points: " + character.visibleHP });

            cardHeader.appendTo(cardDiv);
            cardBody.appendTo(cardDiv);
            cardText.appendTo(cardDiv);
            cardImage.appendTo(cardBody);
            cardDiv.appendTo(columnDiv);
            if (status === "hero") {
                columnDiv.appendTo(heroCardsDiv)
            }
            else {
                columnDiv.appendTo(opponentCardsDiv)
            }
        })
    }

    // move chosen characters to arena
    $(".card").on("click", function () {
        arenaDiv.text("Arena:")
        if (this.id.indexOf("hero") >= 0) {
            if (!heroCharacterChosen) {
                heroCharacterChosen = true;
                heroHitPoints = this.id.split(" ")[2];
                heroAttackPower = this.id.split(" ")[3];
                heroStaticAP = this.id.split(" ")[3];
                $(this).appendTo(arenaHeroDiv);
                createAttackButton();
            }
        }
        else {
            if (!opponentCharacterChosen) {
                opponentCharacterChosen = true;
                opponentHitPoints = this.id.split(" ")[1];
                opponentAttackPower = this.id.split(" ")[2];
                opponentName = this.id.split(" ")[3];
                $(this).appendTo(arenaOpponentDiv);
                createAttackButton();
            }
        }
    });

    // attack function
    $(document).on('click', attackButton, function () {
        if (heroHitPoints > 0 && opponentHitPoints > 0) {
            var heroAttack = (Math.floor(Math.random() * heroAttackPower) + 1);
            opponentHitPoints = parseInt(opponentHitPoints) - parseInt(heroAttack);
            heroAttackPower = parseInt(heroAttackPower) + parseInt(heroStaticAP);
            if (opponentHitPoints <= 0) {
                var index = opponentArray.indexOf(opponentName);
                if (index !== -1) {
                    opponentArray.splice(index, 1);
                }
                arenaDiv.text("Arena: Choose another oponent")
                opponentCharacterChosen = false;
                arenaOpponentDiv.empty();
                buttonsDiv.empty();
                if (opponentArray === undefined || opponentArray.length == 0) {
                    arenaDiv.html("<h1><strong>Congratulations! You defeated all of the opponents!</strong></h1>");
                    allDefeated = true;
                    // enableResetButton();
                }
            }

            // opponent attacks
            var opponentAttack = (Math.floor(Math.random() * opponentAttackPower) + 1);
            heroHitPoints = heroHitPoints - opponentAttack;
            if (heroHitPoints <= 0) {
                arenaDiv.text("<h1><strong>You were defeated</strong></h1>")
            }
        }
    });

    // create attack button if hero and opponent have been chosen
    function createAttackButton() {
        if (heroCharacterChosen && opponentCharacterChosen) {
            var firstTwoColumn = $("<div/>", { class: "col-lg-2" });
            var aButtonColumn = $("<div/>", { class: "col-lg-8" });
            var aButton = $("<button/>", { class: "btn btn-danger btn-lg btn-block", id: "attack-button", text: "ATTACK" })
            var secondTwoColumn = $("<div/>", { class: "col-lg-2" });

            firstTwoColumn.appendTo(buttonsDiv);
            aButton.appendTo(aButtonColumn);
            aButtonColumn.appendTo(buttonsDiv);
            secondTwoColumn.appendTo(buttonsDiv);
        }
    };
});