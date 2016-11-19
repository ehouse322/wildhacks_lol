import requests

def requestSummonerData(region, summonerName): #summoner-v1.4
    URL = "https://" + region + ".api.pvp.net/api/lol/" + region + "/v1.4/summoner/by-name/" + summonerName + "?api_key=" + APIKey
    response = requests.get(URL)
    JSONresponse = response.json()
    summonerID = str(JSONresponse[summonerName]['id'])
    return summonerID

def requestLiveData(region, summonerName): #current-game-v1.0
    URL = "https://" + region + ".api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/" + region + '1/' + summonerName + "?api_key=" + APIKey
    print(URL)
    response = requests.get(URL)
    return response.json()

def main():
	region = input('Region (na, euw, or kr): ')
	summonerName = input('Summoner name: ')
	summonerID = requestSummonerData(region, summonerName)

	responseJSON = requestLiveData(region, summonerID)
	print(responseJSON)

main()