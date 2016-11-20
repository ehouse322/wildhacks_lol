// practice variables
var bGold = 5;
var rGold = 9;
var bGoldDiff = bGold - rGold;
var rGoldDiff = rGold - bGold;

var bTowers = 1;
var rTowers = 1;

var bDragons = 2;
var rDragons = 1;

var bBarons = 1;
var rBarons = 0;

var bKills = 2;
var rKills = 5;

var bScore;
var rScore;

var bChance;
var rChance;

var bSum;
var rSum;
var tSum;

bSum = bKills + bTowers + bBarons + bDragons + bGoldDiff;
rSum = rKills + rTowers + rBarons + rDragons + rGoldDiff;
tSum = bSum + rSum;

if (tSum == 0) {
	bChance = 50,
	rChance = 50
}

if (Math.abs(bGoldDiff) < 0.49) {
	bGoldWeight = bGoldDiff * 0.49
} else if (Math.abs(bGoldDiff) < 1.49) {
	bGoldWeight = bGoldDiff * 1.2
} else {
	bGoldWeight = bGoldDiff * 2
}

if (Math.abs(rGoldDiff) < 0.6) {
	rGoldWeight = rGoldDiff * 0.6
} else if (Math.abs(rGoldDiff) < 1.5) {
	rGoldWeight = rGoldDiff * 1.3
} else {
	rGoldWeight = rGoldDiff * 2
}

if (tSum < 10) {
	bScore = bKills + (bTowers * 1.4) + (bBarons * 2.5) + (bDragons * 1.2) + bGoldWeight   
	rScore = rKills + (rTowers * 1.4) + (rBarons * 2.5) + (rDragons * 1.2) + rGoldWeight
} else if (tSum < 20) {
	bScore = bKills + (bTowers * 1.7) + (bBarons * 2.8) + (bDragons * 1.3) + bGoldWeight  
	rScore = rKills + (rTowers * 1.7) + (rBarons * 2.8) + (rDragons * 1.3) + rGoldWeight
} else {
	bScore = bKills + (bTowers * 3) + (bBarons * 3.8) + (bDragons * 2.3) + bGoldWeight
	rScore = rKills + (rTowers * 3) + (rBarons * 3.8) + (rDragons * 2.3) + rGoldWeight
}

// bScore = bKills + (bTowers * 3) + (bBarons * 3.8) + (bDragons * 2.3) + (bGoldDiff * 2)
// rScore = rKills + (rTowers * 3) + (rBarons * 3.8) + (rDragons * 2.3) + (rGoldDiff * 2)

bChance = Math.floor(bScore/(bScore+rScore)*100); // Calculate blue side chance of winning
rChance = Math.floor(rScore/(bScore+rScore)*100); // Calculate red side chance of winning

console.log(bScore)
console.log(rScore)

console.log(bChance)
console.log(rChance)