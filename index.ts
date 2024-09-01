#! /usr/bin/env node


import inquirer from "inquirer";
import chalk from "chalk";

class Player{
    name:string;
    fuel:number = 100;

constructor(myPlayerName:string){
    this.name=myPlayerName
}
fuelDecrease(){
    this.fuel = this.fuel-25;
}
fuelIncrease(){
    this.fuel = this.fuel+25;
}
}

class Opponent{
    name:string;
    fuel:number=100;

constructor(opponentName:string){
    this.name=opponentName
}
fuelDecrease(){
    this.fuel = this.fuel-25;
}
}

let userInput = await inquirer.prompt([
{
    type:"input",
    name:"myName",
    message:"Enter your name:"
},
{
    type:"list",
    name:"opponentName",
    message:"Select your Opponent",
    choices:["Skeleton","Alien","Zombie"]
}
]);

let {myName,opponentName} = userInput
console.log(`${chalk.bold.yellow(myName)} Vs ${chalk.bold.red(opponentName)}`);

let myPlayer = new Player(myName);
let myOpponent = new Opponent(opponentName);

while(true){
    let startMatch = await inquirer.prompt({
      type:"list",
      name:"Options",
      message:"Select your Option:",
      choices:["Attack","Drink portion","Run for life"]
    })

   let {Options}= startMatch;
   
   if(Options === "Attack") attackFun();
   if(Options === "Drink portion") drinkPortionFun();
   if(Options === "Run for life") runforlifeFun();

function attackFun(){
    let number = Math.floor(Math.random()*2);

    if(number === 0){
        myPlayer.fuelDecrease();
        console.log(`${myPlayer.name}'s fuel is ${chalk.bold.red(myPlayer.fuel)}`);
        console.log(`${myOpponent.name}'s fuel is ${chalk.bold.green(myOpponent.fuel)}\n`);

    if(myPlayer.fuel === 0){
        console.log(`${myPlayer.name} lost! Better luck next time\n`);
        process.exit();
    }
}
    if(number === 1){
        myOpponent.fuelDecrease();
        console.log(`${myPlayer.name}'s fuel is ${chalk.bold.green(myPlayer.fuel)}`);
        console.log(`${myOpponent.name}'s fuel is ${chalk.bold.red(myOpponent.fuel)}\n`);
    
    if(myOpponent.fuel === 0){
        console.log(chalk.bold.magenta(`Congratulations! ${myPlayer.name} you won the game.\n`));
        process.exit();
    }
  }
}

function drinkPortionFun(){
    myPlayer.fuelIncrease();
    console.log(chalk.bold.blue(`${myPlayer.name}'s fuel is increase to ${myPlayer.fuel}`));
}

function runforlifeFun(){
    console.log(chalk.bold.blackBright(`${myPlayer.name} lost! Better luck next time!.`));
    process.exit();
 }
};

