
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
        "image": "./assets/images/Rey.png"
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
        "visibleHP": "Unknown",
        "hitPoints": 300,
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
    var arenaHeroDiv = $("#arena-hero");
    var heroCardsDiv = $("#hero-cards");
    var arenaOpponentDiv = $("#arena-opponent");
    var opponentCardsDiv = $("#opponent-cards");
    var buttonsDiv = $("#buttons");
    var attackButton = $("#attack-button");

    // variables
    var characterArray = [luke, rey, hanSolo, yoda, darthVader, kyloRen, darthMaul, senatorPalpatine];
    var heroCharacterChosen = false;
    var heroHitPoints = 0;
    var heroFooter = "";
    var opponentCharacterChosen = false;
    var opponentArray = [darthVader.lastName, kyloRen.lastName, darthMaul.lastName, senatorPalpatine.lastName]
    var opponentHitPoints = 0;
    var opponentFooter = "";

    // start game by building cards
    buildCards();

    // move chosen hero to arena
    $(".hero").on("click", function () {
        if (!heroCharacterChosen) {
            heroCharacterChosen = true;
            heroHitPoints = this.id.split(" ")[0];
            heroAttackPower = this.id.split(" ")[1];
            heroStaticAP = this.id.split(" ")[1];
            heroName = this.id.split(" ")[2];
            heroFooter = $("#" + heroName + "hero-footer");
            heroFooter.html("Hit Points: " + heroHitPoints);
            $(this).appendTo(arenaHeroDiv);
        }
    });

    // move chosen opponent to arena
    $(".opponent").on("click", function () {
        arenaDiv.text("Arena:")
        // must choose hero first
        if (!opponentCharacterChosen && heroCharacterChosen) {
            opponentCharacterChosen = true;
            opponentHitPoints = this.id.split(" ")[0];
            opponentAttackPower = this.id.split(" ")[1];
            opponentName = this.id.split(" ")[2];
            opponentFooter = $("#" + opponentName + "opponent-footer");
            opponentFooter.html("Hit Points: " + opponentHitPoints);
            $(this).appendTo(arenaOpponentDiv);
            // only create button with first enemy chosen
            if (opponentArray.length === 4) {
                checkAttackButton();
            }
        }
    });

    // build the character cards
    function buildCards() {
        arenaDiv.text("Arena")
        $.each(characterArray, function () {
            var character = this;
            var status = this.status;
            var columnDiv = $("<div/>", { class: "col-lg-3" });
            if (status === "hero") {
                var cardDiv = $("<div/>", { class: "card hero bg-light mb-3", id: character.hitPoints + " " + character.attackPower + " " + character.firstName });
                var cardFooter = $("<div/>", { class: "card-footer", id: character.firstName + "hero-footer", text: "Hit Points: " + character.visibleHP });
            }
            else {
                var cardDiv = $("<div/>", { class: "card opponent bg-dark text-white mb-3", id: character.hitPoints + " " + character.attackPower + " " + character.lastName });
                var cardFooter = $("<div/>", { class: "card-footer", id: character.lastName + "opponent-footer", text: "Hit Points: " + character.visibleHP });
            }
            var cardHeader = $("<div/>", { class: "card-header", text: character.firstName + " " + character.lastName });
            var cardImage = $("<img/>", { class: "card-img-top", src: character.image });
            var cardBody = $("<div/>", { class: "card-body" });

            cardHeader.appendTo(cardDiv);
            cardBody.appendTo(cardDiv);
            cardFooter.appendTo(cardDiv);
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

    // attack function
    function canAttack() {
        $("#attack-button").on("click", function () {
            // hero attack
            var heroAttack = (Math.floor(Math.random() * heroAttackPower) + 1);
            opponentHitPoints = opponentHitPoints - heroAttack;
            heroAttackPower = parseInt(heroAttackPower) + parseInt(heroStaticAP);
            var opponentText = "Hit Points: " + opponentHitPoints;
            // update opponent hit points
            // font color red if under 100
            if (opponentHitPoints <= 100) {
                opponentFooter.html(opponentText).addClass("red");

            }
            else {
                opponentFooter.html(opponentText);
            }

            // check if opponent is defeated
            if (opponentHitPoints <= 0) {
                var index = opponentArray.indexOf(opponentName);
                if (index !== -1) {
                    opponentArray.splice(index, 1);
                }
                arenaDiv.text("Arena: Choose another opponent");
                opponentCharacterChosen = false;
                arenaOpponentDiv.empty();
                if (opponentArray === undefined || opponentArray.length == 0) {
                    arenaDiv.html("<h1><strong>Congratulations! You defeated all of the opponents!</strong></h1>");
                }
            }

            // opponent attacks if not defeated
            if (opponentCharacterChosen) {
                var opponentAttack = (Math.floor(Math.random() * opponentAttackPower) + 1);
                heroHitPoints = heroHitPoints - opponentAttack;
                var heroText = "Hit Points: " + heroHitPoints;
                // update hero hit points
                // font color red if under 100
                if (heroHitPoints <= 100) {
                    heroFooter.html(heroText).addClass("red");
                }
                else {
                    heroFooter.html(heroText);
                }

                // check if hero is defeated
                if (heroHitPoints <= 0) {
                    arenaDiv.text("<h1><strong>You were defeated</strong></h1>");
                }
            }
        });
    }

    // create attack button if hero and opponent have been chosen
    function checkAttackButton() {
        if (heroCharacterChosen && opponentCharacterChosen) {
            var firstTwoColumn = $("<div/>", { class: "col-lg-2" });
            var aButtonColumn = $("<div/>", { class: "col-lg-8" });
            var aButton = $("<button/>", { class: "btn btn-danger btn-lg btn-block", id: "attack-button", text: "ATTACK" });
            var secondTwoColumn = $("<div/>", { class: "col-lg-2" });

            firstTwoColumn.appendTo(buttonsDiv);
            aButton.appendTo(aButtonColumn);
            aButtonColumn.appendTo(buttonsDiv);
            secondTwoColumn.appendTo(buttonsDiv);
            canAttack();
        }
    };
});