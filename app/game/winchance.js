var b_top_kda = [1,0,0];
var b_jg_kda = [0,0,0];
var b_mid_kda = [0,0,0];
var b_adc_kda = [0,0,0];
var b_supp_kda = [0,0,0];

var r_top_kda = [0,0,0];
var r_jg_kda = [0,0,0];
var r_mid_kda = [0,0,0];
var r_adc_kda = [0,0,0];
var r_supp_kda = [5,0,0];


var r_gold = 6;
var b_gold = 6;

var b_towers = 1;
var r_towers = 1;

var b_drag = 1;
var r_drag = 0;
var b_baron = 0;
var r_baron = 0;

//var b_vector = b_top_kda.concat(b_jg_kda,b_mid_kda,b_adc_kda,b_supp_kda,b_gold,b_towers,b_drag,b_baron);
//var r_vector = r_top_kda.concat(r_jg_kda,r_mid_kda,r_adc_kda,r_supp_kda,r_gold,r_towers,r_drag,r_baron);

var r_winchance;
var b_winchance;

// k: kill weight
// d: death weight
// a: assist weight
// The following functions assign weights to the number of kills, deaths, assists (depending on role).
// They also assign weights based on gold, tower, dragons slain, and barons slain.
// Because the marginal value of each of these stats diminishes as more are accumulated, the weights decrease accordingly

function top_kda_calc(kda){
	var k;
	var d;
	var a = 0.1;
	if (kda[0]<3){
		k = 1;
	} else if (kda[0]<6){
		k = 0.9;
	} else {
		k = 0.8;
	}
	if (kda[1]<3){
		d = -0.5;
	} else if (kda[1]<6){
		d = -0.4;
	} else {
		d = -0.35;
	}
	return kda[0]*k + kda[1]*d + kda[2]*a;
}
function jg_kda_calc(kda){
	var k;
	var d;
	var a;
	if (kda[0]<3){
		k = 1.2;
	} else if (kda[0]<6){
		k = 1.1;
	} else {
		k = 1.0;
	}
	if (kda[1]<3){
		d = -0.4;
	} else {
		d = -0.3;
	}
	if (kda[2]<4){
		a = 0.2;
	} else {
		a = 0.17;
	}
	return kda[0]*k + kda[1]*d + kda[2]*a;
}
function mid_kda_calc(kda){
	var k;
	var d;
	var a = 0.1;
	if (kda[0]<3){
		k = 1.3;
	} else if (kda[0]<6){
		k = 1.1;
	} else {
		k = 1.0;
	}
	if (kda[1]<3){
		d = -0.6;
	} else if (kda[1]<6){
		d = -0.5;
	} else {
		d = -0.45;
	}
	return kda[0]*k + kda[1]*d + kda[2]*a;
}
function adc_kda_calc(kda){
	var k;
	var d;
	var a = 0.1;
	if (kda[0]<3){
		k = 1.4;
	} else if (kda[0]<6){
		k = 1.2;
	} else {
		k = 1.1;
	}
	if (kda[1]<3){
		d = -0.6;
	} else if (kda[1]<6){
		d = -0.5;
	} else {
		d = -0.45;
	}
	return kda[0]*k + kda[1]*d + kda[2]*a;
}
function supp_kda_calc(kda){
	var k;
	var d;
	var a;
	if (kda[0]<3){
		k = 0.7;
	} else if (kda[0]<6){
		k = 0.6;
	} else {
		k = 0.55;
	}
	if (kda[1]<3){
		d = -0.3;
	} else if (kda[1]<6){
		d = -0.25;
	} else {
		d = -0.3;
	}
	if (kda[2]<4){
		a = 0.7;
	} else if (kda[2]<8){
		a = 0.6;
	} else {
		a = 0.55;
	}
	return kda[0]*k + kda[1]*d + kda[2]*a;
}
function gold_calc(gold){
	if (gold < 50) {
		return gold*3;
	} else {
		return gold*2.95;
	}
}
function tower_calc(towers) {
	var t;
	if (towers<2) {
		t = 5;
	} else if (towers <7){
		t = 3;
	} else if (towers < 10) {
		t = 3.5;
	} else {
		t = 3.8;
	}
	return towers*t;
}
function drag_calc(dragons) {
	return dragons*4;
}
function baron_calc(barons) {
	return barons*8;
}

// Blue side raw score
var b_score = 
top_kda_calc(b_top_kda)+jg_kda_calc(b_jg_kda)+mid_kda_calc(b_mid_kda)+adc_kda_calc(b_adc_kda)+supp_kda_calc(b_supp_kda)+gold_calc(b_gold)+tower_calc(b_towers)+drag_calc(b_drag)+baron_calc(b_baron);
// Red side raw score
var r_score =
top_kda_calc(r_top_kda)+jg_kda_calc(r_jg_kda)+mid_kda_calc(r_mid_kda)+adc_kda_calc(r_adc_kda)+supp_kda_calc(r_supp_kda)+gold_calc(r_gold)+tower_calc(r_towers)+drag_calc(r_drag)+baron_calc(r_baron);

b_winchance = Math.floor(b_score/(b_score+r_score)*100); // Calculate blue side chance of winning
r_winchance = Math.floor(r_score/(b_score+r_score)*100); // Calculate red side chance of winning

console.log(b_winchance);
console.log(r_winchance);