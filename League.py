import requests

def requestSummonerData(region,summonerName, APIKey): #summoner-v1.4
    URL = "https://" + region + ".api.pvp.net/api/lol/" + region + "/v1.4/summoner/by-name/" + summonerName + "?api_key=" + APIKey
    response = requests.get(URL)
    return response.json() 

def requestRankedData(region, ID, APIKey): #league-v2.5
    URL = "https://" + region + ".api.pvp.net/api/lol/" + region + "/v2.5/league/by-summoner/" + ID + "/entry?api_key=" + APIKey
    response = requests.get(URL)
    return response.json()

def requestChampionData(region, APIKey): #lol-static-data-v1.2
    URL = "https://global.api.pvp.net/api/lol/static-data/" + region + "/v1.2/champion?api_key=" + APIKey
    response = requests.get(URL)
    return response.json()

def requestMatchList(region, ID, championID, APIKey): #matchlist-v2.2
    URL = ("https://" + region + ".api.pvp.net/api/lol/" + region + "/v2.2/matchlist/by-summoner/" + ID + "?championIds=" + championID + "&rankedQueues=RANKED_SOLO_5x5&seasons=SEASON2015&api_key=" + APIKey)
    response = requests.get(URL)
    return response.json()

def requestMatchData(region, matchId, APIKey): #match-v2.2
    URL = "https://" + region + ".api.pvp.net/api/lol/" + region + "/v2.2/match/" + str(matchId) + "?api_key=" + APIKey
    response = requests.get(URL)
    return response.json()


def main():
    # Inputs
    print "Why, hello there!\n"
    region = (str)(raw_input('Region (na, euw, or kr): '))
    summonerName = (str)(raw_input('Summoner Name: '))
    champion = (str)(raw_input('Champion: '))
    APIKey = (str)("cd0b763b-86f1-433e-9dd4-c02ee8e602d1")
    
    # Call Summoner ID and Level
    responseJSON = requestSummonerData(region, summonerName, APIKey)
    ID = responseJSON[summonerName]['id']
    ID = str(ID)
    level = responseJSON[summonerName]['summonerLevel']

    # Call Ranked Data
    responseJSON2 = requestRankedData(region, ID, APIKey)
    leaguePoints = responseJSON2[ID][0]['entries'][0]['leaguePoints']
    division = responseJSON2[ID][0]['entries'][0]['division']
    wins = responseJSON2[ID][0]['entries'][0]['wins']
    losses = responseJSON2[ID][0]['entries'][0]['losses']
    tier = responseJSON2[ID][0]['tier']

    # Call Champion ID
    responseJSON3 = requestChampionData(region, APIKey)
    championID = responseJSON3['data'][champion]['id']
    championID = str(championID)

    # Extract Match IDs and Most Commonly Played Lane
    responseJSON4 = requestMatchList(region,ID,championID,APIKey)
    matchlist = {}
    lane = [0,0,0,0]
    for x in range(0,len(responseJSON4)-1):
        matchlist[x] = responseJSON4['matches'][x]['matchId']
        if responseJSON4['matches'][x]['lane'] == "TOP":
            lane[0] = lane[0] + 1
        elif  responseJSON4['matches'][x]['lane'] == "JUNGLE":
            lane[1] = lane[1] + 1
        elif  responseJSON4['matches'][x]['lane'] == "MID":
            lane[2] = lane[2] + 1
        elif  responseJSON4['matches'][x]['lane'] == "BOTTOM":
            lane[3] = lane[3] + 1
    if lane.index(max(lane)) == 0:
        favoriteLane = "top"
    elif lane.index(max(lane)) == 1:
        favoriteLane = "jungle"
    elif lane.index(max(lane)) == 2:
        favoriteLane = "mid"
    elif lane.index(max(lane)) == 3:
        favoriteLane = "bottom"

    # Aggregate Match Data
    for x in range(0,len(matchlist)):
        responseJSON5 = requestMatchData(region, matchlist[x], APIKey)
        for i in range(0,9):
            if responseJSON5['participantIdentities'][i]['player']['summonerName'] == summonerName:
                participantId = responseJSON5['participantIdentities'][i]['participantId']
        # Count win rates conditioned on champions on team and on enemy team here

    # Output
    print "Your Summoner Name is: " + summonerName
    print "Your Solo Queue Tier is: " + tier + " " + division + " (" + str(leaguePoints) + " LP)"
    print "You most frequently play " + champion + " " + favoriteLane + "."

if __name__ == "__main__":
    main()