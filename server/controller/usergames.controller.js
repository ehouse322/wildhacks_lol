const request = require("request");
const leagueKey = process.env.LEAGUE_CRED;

module.exports.getGames = function (req, res) {
    const summonerName = req.params.summonerName;
    const region = req.params.region;
    const url = "https://" + region + ".api.pvp.net/api/lol/" + region + "/v1.4/summoner/by-name/" + summonerName + "?api_key=" + leagueKey;
    request({ uri: url, method: "GET" }, function(err, response, body){
        if (err || body == undefined) {
            res.sendStatus(404);
        } else {
            const data = JSON.parse(body);
            if (data.status) {
                res.sendStatus(404);
            } else {
                const id = data[summonerName].id;
                requestLiveData(region, id, res);
            }
        }
    });
}

const requestLiveData = function(region, summonerId, res) {
    const url = "https://" + region + ".api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/" + region + '1/' + summonerId + "?api_key=" + leagueKey;
    request({ uri: url, method: "GET" }, function(err, response, body){
        if (err || body == undefined) {
            res.sendStatus(404);
        } else {
        	const data = JSON.parse(body);
        	if (data.status) {
                res.sendStatus(404);
            } else {
            	res.json(data);
            }
        }
    });
}
    

module.exports.getChampInfo = function (req, res) {
	const championID = req.params.championID;
	const region = "na";
	const url = "https://" + region + ".api.pvp.net/api/lol/" + region + "/v1.2/champion/" + championID + "?api_key=" + leagueKey;
	request({ uri: url, method: "GET"}, function(err, response, body){
		if (err) {
			res.sendStatus(404);
		} else {
			const champData = JSON.parse(body);
			if (champData.status) {
				res.sendStatus(champData.status.status_code);
			} else {
				const freeToPlay = champData['freeToPlay']
				res.json(freeToPlay);
			} 
		}
	});
}