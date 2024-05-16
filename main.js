#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Player {
    name;
    health;
    constructor(name, health = 100) {
        this.name = name;
        this.health = health;
    }
    decreaseHealth(amount) {
        this.health -= amount;
        if (this.health < 0)
            this.health = 0;
    }
    resetHealth() {
        this.health = 100;
    }
}
class Enemy extends Player {
}
console.log("\n" + chalk.greenBright("-".repeat(70)));
const gameIntro = chalk.yellow.bold.italic("\n\t Welcome to the Hamdan adventure game !! ");
const gameNote = chalk.red.bold.italic(`\n\tRemember: `) +
    chalk.green.bold.italic(`You have 3 MODES: EASY, MEDIUM, HARD\n\tThere are different Enemy in each modes.\n\tIf you choose the hard level, the enemy will be Harder .`);
console.log(gameIntro);
console.log(gameNote);
console.log("\n" + chalk.greenBright("-".repeat(70)));
const gameLevels = [
    "Easy Mode:",
    "Medium Mode:",
    "Hard Mode:",
    "Exit To Game:",
];
const opponents = ["Mutant", "King Ghidorah", "Destoroyah"];
async function playGame() {
    let continueProgram = true;
    while (continueProgram) {
        const { levels } = await inquirer.prompt([
            {
                name: "levels",
                type: "list",
                choices: gameLevels,
                message: "Select the game level or Exit to Game.",
            },
        ]);
        if (levels === "Exit To Game:") {
            console.log(chalk.green.bold.italic(`\n\tThanks for playing this game.\n\t    Give your precious feedback to the developer.\n`));
            console.log(chalk.green.bold.italic(`\tGAME CREATOR : => `) +
                chalk.yellow(`"Muhammad Hamdan Bhatti"`));
            break;
        }
        const { userName } = await inquirer.prompt([
            {
                name: "userName",
                type: "string",
                message: "Enter your name.",
                validate: (value) => value.trim() !== "" || "Please enter your name.",
            },
        ]);
        const player = new Player(userName.toUpperCase());
        const opponentIndex = gameLevels.indexOf(levels);
        const { opnSelect } = await inquirer.prompt([
            {
                name: "opnSelect",
                type: "list",
                choices: [opponents[opponentIndex]],
                message: `Select ${opponents[opponentIndex].toUpperCase()} To Fight.`,
            },
        ]);
        const opponent = new Enemy(opnSelect);
        console.log(chalk.green.bold.italic(`\n\t${player.name}`) +
            chalk.red.bold.italic(` VS `) +
            chalk.green.bold.italic(`${opponent.name}\n`));
        const { mode } = await inquirer.prompt([
            {
                name: "mode",
                type: "list",
                choices: ["Attack Enemy:"],
                message: `CLICK "Attack Enemy" To Fight with ${opponent.name}.`,
            },
        ]);
        if (mode === "Attack Enemy:") {
            let continueMode = true;
            while (continueMode) {
                const number = Math.floor(Math.random() * 2);
                if (number > 0) {
                    player.decreaseHealth(opponentIndex === 0 ? 20 : opponentIndex === 1 ? 30 : 50);
                    console.log(chalk.green.bold.italic(`\n\t${opponent.name} Health is: ${opponent.health}`));
                    console.log(chalk.red.bold.italic(`\t${player.name} Health is: ${player.health}\n`));
                    console.log(chalk.red.bold.italic(`\n\t${opponent.name} Hits you. Your health is draining. YOU NEED Energy Drink.\n`));
                    if (player.health <= 0) {
                        console.log(chalk.red.bold.italic(`\n\t${player.name}: You lost. Try again.\n`));
                        break;
                    }
                }
                else {
                    opponent.decreaseHealth(opponentIndex === 0 ? 50 : opponentIndex === 1 ? 30 : 30);
                    console.log(chalk.green.bold.italic(`\n\t${player.name} Health is: ${player.health}`));
                    console.log(chalk.red.bold.italic(`\t${opponent.name} Health is: ${opponent.health}\n`));
                    if (opponent.health <= 0) {
                        console.log(chalk.green.bold.italic(`\n    Congratulations => ${player.name} <= You Won the Game\n`));
                        break;
                    }
                }
                if (player.health < 100) {
                    const { health } = await inquirer.prompt([
                        {
                            name: "health",
                            type: "list",
                            choices: [
                                "Need Energy Drink:",
                                "No Need for Energy Drink:",
                            ],
                            message: "If you need Health CLICK On Option 1, Otherwise click on option 2 to Give Up .",
                        },
                    ]);
                    if (health === "Need Energy Drink:") {
                        player.resetHealth();
                        console.log(chalk.green.bold.italic(`\t\nYour Health Is Full To => ${player.health} <=\n   You are Ready to Fight ${opponent.name}.\n`));
                    }
                }
                const { continue: wantToContinue } = await inquirer.prompt([
                    {
                        name: "continue",
                        type: "list",
                        choices: ["YES", "NO"],
                        message: `Do you want to continue fight with ${opponent.name}?`,
                    },
                ]);
                if (wantToContinue === "NO") {
                    console.log(chalk.red.bold.italic(`\n\t${opponent.name} Has Defeated ${player.name}.\n`));
                    continueMode = false;
                }
            }
        }
        const { continue: wantContinue } = await inquirer.prompt([
            {
                name: "continue",
                type: "list",
                choices: ["YES", "NO"],
                message: "Do you want to play another level of this Game.",
            },
        ]);
        if (wantContinue === "NO") {
            console.log(chalk.yellowBright.bold.italic(`\n\tI HOPE YOU ENJOYED THE GAME.\n`));
            console.log(chalk.green.bold.italic(`\tGame Creator : => `) +
                chalk.yellow(`"Muhammad Hamdan Bhatti"`));
            continueProgram = false;
        }
    }
}
playGame();
