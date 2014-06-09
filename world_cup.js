var teams = [
    {"id":"gre","title":"Greece","code":"GRE","group":"c"},
    {"id":"rus","title":"Russia","code":"RUS","group":"h"},
    {"id":"ned","title":"Netherlands","code":"NED","group":"b"},
    {"id":"ger","title":"Germany","code":"GER","group":"g"},
    {"id":"por","title":"Portugal","code":"POR","group":"g"},
    {"id":"esp","title":"Spain","code":"ESP","group":"b"},
    {"id":"ita","title":"Italy","code":"ITA","group":"d"},
    {"id":"cro","title":"Croatia","code":"CRO","group":"a"},
    {"id":"fra","title":"France","code":"FRA","group":"e"},
    {"id":"eng","title":"England","code":"ENG","group":"d"},
    {"id":"sui","title":"Switzerland","code":"SUI","group":"e"},
    {"id":"bel","title":"Belgium","code":"BEL","group":"h"},
    {"id":"bih","title":"Bosnia-Herzegovina","code":"BIH","group":"f"},
    {"id":"alg","title":"Algeria","code":"ALG","group":"h"},
    {"id":"civ","title":"C\u00f4te d'Ivoire","code":"CIV","group":"c"},
    {"id":"gha","title":"Ghana","code":"GHA","group":"g"},
    {"id":"cmr","title":"Cameroon","code":"CMR","group":"a"},
    {"id":"nga","title":"Nigeria","code":"NGA","group":"f"},
    {"id":"mex","title":"Mexico","code":"MEX","group":"a"},
    {"id":"usa","title":"United States","code":"USA","group":"g"},
    {"id":"hon","title":"Honduras","code":"HON","group":"e"},
    {"id":"crc","title":"Costa Rica","code":"CRC","group":"d"},
    {"id":"arg","title":"Argentina","code":"ARG","group":"f"},
    {"id":"bra","title":"Brazil","code":"BRA","group":"a"},
    {"id":"chi","title":"Chile","code":"CHI","group":"b"},
    {"id":"uru","title":"Uruguay","code":"URU","group":"d"},
    {"id":"col","title":"Colombia","code":"COL","group":"c"},
    {"id":"ecu","title":"Ecuador","code":"ECU","group":"e"},
    {"id":"aus","title":"Australia","code":"AUS","group":"b"},
    {"id":"jpn","title":"Japan","code":"JPN","group":"c"},
    {"id":"kor","title":"South Korea","code":"KOR","group":"h"},
    {"id":"irn","title":"Iran","code":"IRN","group":"f"}]
    ;

function getMatches(group, matches, roundNum) {
    var group = group;
    var matches = matches;
    var roundNum = roundNum;
    roundDict = {'1':16,'2':32,'3':48,'4':56,'5':60,'6':62,'7':64};
//    console.log('in getMatches()');
//    console.log(JSON.stringify(group));
    for(getMatchKey in group) {
//        console.log('finding ' + getMatchKey + ' matches');
        for(i=0; i < roundDict[roundNum]; i++) {
            if(getMatchKey in matches[i]) {
                var theMatch = {};
                for(matchKey in matches[i]) {
                    if(getMatchKey === matchKey) {
                        theMatch['goalsFor'] = matches[i][getMatchKey];
                    }
                    else {
                        theMatch['goalsAgainst'] = matches[i][matchKey];
                        theMatch['opponent'] = matchKey;
                    };
                };
            group[getMatchKey]['matches'].push(theMatch);
            };
        };
    };
    return group
};

function pointCounter(match) {
    if(match['goalsFor'] > match['goalsAgainst']) {
        return 3;
    }
    else if(match['goalsFor'] === match['goalsAgainst']) {
        return 1;
    }
    else {
        return 0;
    }
};

function pointTotal(team) {
    var points = 0;
    for (i=0; i < team['matches'].length; i++) {
        points += pointCounter(team['matches'][i]);
    };
    return points;
};

function goalsScored(team) {
    var goalsFor = 0;
    for (i=0; i < team['matches'].length; i++) {
        goalsFor += team['matches'][i]['goalsFor'];
    };
    return goalsFor;
};

function goalDifference(team) {
    var goalsFor = goalsScored(team);
    var goalsAgainst = 0;
    for (i=0; i < team['matches'].length; i++) {
        goalsAgainst += team['matches'][i]['goalsAgainst'];
    };
    return goalsFor - goalsAgainst;
};

function sortFinal(group, matches) {
    var group = group;
    var matches = matches;
    for(sortFinalKey in group) {
        if(group[sortFinalKey]['matches'].length === 7) {
            if(sortFinalKey in matches[62]) {
                if(pointCounter(group[sortFinalKey]['matches'][6])===3) {
                    group[sortFinalKey]['place'][6] = 3;
                }
                else {
                    group[sortFinalKey]['place'][6] = 4;
                };
            };
            if(sortFinalKey in matches[63]) {
                if(pointCounter(group[sortFinalKey]['matches'][6])===3) {
                    group[sortFinalKey]['place'][6] = 1;
                }
                else {
                    group[sortFinalKey]['place'][6] = 2;
                };
            };
        };
    };
    return group;
};

function groupSorter(group) {
    var group = group;
    var orderedList = [];
    for(sorterKey in group) {
        orderedList.push(group[sorterKey]);
//        console.log(group[sorterKey].id);
    };
    orderedList = orderedList.sort(function (a,b) {
//        console.log('in points');
        if (a.matches.length != b.matches.length) {
            if (a.matches.length > b.matches.length) {
                return -1;
            }
            if (a.matches.length < b.matches.length) {
                return 1;
            }
            else {
                return 0;
            };
        };
        if (a.points != b.points) {
            if (a.points > b.points) {
                return -1;
            }
            if (a.points < b.points) {
                return 1;
            }
            else {
                return 0;
            };
        };
        if (a.goalDiff != b.goalDiff) {
//            console.log('in goalDiff');
            if (a.goalDiff > b.goalDiff) {
                return -1;
            }
            if (a.goalDiff < b.goalDiff) {
                return 1;
            }
            else {
                return 0;
            };
        };
        if (a.goals != b.goals) {
//            console.log('in goals scored');
            if (a.goals > b.goals) {
                return -1;
            }
            if (a.goals < b.goals) {
                return 1;
            }
            else {
                return 0;
            };
        };
        for(i=0;i<a['matches'].length;i++) {
//            console.log('in head to head');
            if(b.id in a['matches']) {
                if(a.goalsFor > a.goalsAgainst) {
                    return -1;
                }
                if(a.goalsFor < a.goalsAgainst) {
                    return 1;
                }
            };
        };
//        console.log('coin flipped');
        return Math.floor(Math.random() * (1 - 0 + 1))
    });
    for(i=0;i<orderedList.length;i++) {
        console.log(orderedList[i].id);
        group[orderedList[i].id]['place'] = i + 1;
        group[orderedList[i].id]['rank'].push(i + 1);
    };
    return group;
};

function roundFourMatches(group, matches, groupLetter) {
    var group = group;
    var matches = matches;
    var matchupDict = {'a':[49,51],'b':[51,49],'c':[50,52],'d':[52,50],
                       'e':[53,55],'f':[55,53],'g':[54,56],'h':[56,54]
    }
    var roundFourDict = {};
    for(roundFourKey in group) {
        if(group[roundFourKey]['place'] === 1) {
            matches[matchupDict[groupLetter][0]-1][roundFourKey] = 0; 
        }
        if(group[roundFourKey]['place'] === 2) {
            matches[matchupDict[groupLetter][1]-1][roundFourKey] = 0;
        }
    };
    return matches;
};

function knockoutMatches(group, matches, round) {
    var group = group;
    var matches = matches;
    var round = round;
    var roundDict = {'4':[48,55],'5':[56,59],'6':[60,61],'7':[62,63]};
    var matchMap = {'48':56,'49':56,'50':58,'51':58,'52':57,'53':57,
                    '54':59,'55':59,'56':60,'57':60,'58':61,'59':61};
                    
    for(knockoutKey in group) {
//        console.log(knockoutKey + '-' + group[knockoutKey]['place']);
//        console.log('round generated: ' + round);
//        console.log('round searched: ' + (round-1));
        if(group[knockoutKey]['matches'].length === round-1) {
            if(group[knockoutKey]['matches'].length !== 6) {
                for(i=roundDict[(round-1).toString()][0];
                    i<=roundDict[(round-1).toString()][1];i++) {
                    if(knockoutKey in matches[i]) {
                        if(pointCounter(group[knockoutKey]['matches'][round-2]
                            ) > 0) {
                            for(mapKey in matchMap) {
//                                console.log('parsing match: ' + knockoutKey);
                                if(parseInt(mapKey) === i) {
                                    matches[matchMap[mapKey]][knockoutKey] = 0;
                                };
                            };
                        };
                    };
                };
            }
            else {
                if(pointCounter(group[knockoutKey]['matches'][5]) === 3) {
                    matches[63][knockoutKey] = 0;
                }
                else {
                    matches[62][knockoutKey] = 0;
                };
            };
        };
    };
    return matches;
};

function refreshData(group, matches, round) {
    var group = group;
    var matches = matches;
    var round = round;
//    console.log('refreshdata group: ' + JSON.stringify(group));
    for(groupKey in group) {
        group[groupKey]['matches'] = [];
    };
    group = getMatches(group, matches, round);
    for(groupKey in group) {
        group[groupKey]['points'] = pointTotal(group[groupKey]);
        group[groupKey]['goals'] = goalsScored(group[groupKey]); 
        group[groupKey]['goalDiff'] = goalDifference(group[groupKey]);
    };
    return group;
};

function writeGroup(group) {
    for(writeKey in group) {
        for(i=0; i < group[writeKey]['matches'].length; i++) {
            document.writeln(writeKey+' v ' +group[writeKey]['matches'][i]['opponent']+' - ');
            document.writeln('scored: ' +group[writeKey]['matches'][i]['goalsFor']);
            document.writeln('allowed: '+group[writeKey]['matches'][i]['goalsAgainst'] + '<br>');
            };
        document.writeln(writeKey+' total points: ' + group[writeKey]['points'] + '<br>' + writeKey + ' finished in position: ' + group[writeKey]['place'] + "<br><br>");
    };
};

function createMatches(matches) {
    var match;
    var tempMatches = [];
    var matchStr;
    var addMatch = false;
    for(i=0;i<teams.length;i++) {
        for(j=0;j<teams.length;j++) {
            if(teams[i]['group'] === teams[j]['group']) {
                if(teams[i]['id'] !== teams[j]['id']) {
                    if(matches.length === 0) {
                        addMatch = true;
                                            }
                    else {
                        addMatch = true;
                        for(k=0;k<matches.length;k++) {
                            if(teams[j]['id'] in matches[k] && 
                               teams[i]['id'] in matches[k]) {
                                addMatch = false;
                            };
                        };
                    };
                    if(addMatch === true) {
                        matchStr = '{\"' +teams[i]['id'] + '\":0,\"' +
                            teams[j]['id'] + '\":0}';
                        matches.push(JSON.parse(matchStr));
//                        console.log('added:'+teams[i]['id']+','+
//                                            teams[j]['id']);
                        addMatch = false;
                    };
                };
            };
        };
    };
    return matches;
};

function getGroup(groupLetter) {
    var group = {};
    var groupLetter = groupLetter;
    for(j=0;j<teams.length;j++) {
        if(groupLetter === teams[j].group) {
            group[teams[j].id] = {matches:[],points:0,place:null,rank:[],
                                  goals:0,goalDiff:0,id:teams[j].id};
//            console.log('getGroup ' + groupLetter + ':' + teams[j].id);
        };
    };
    return group;
};

var matches = [{"bra":3,"cro":1},{"cmr":0,"mex":0},{"ned":2,"esp":0},
               {"chi":2,"aus":0},{"gre":0,"col":0},{"crc":1,"uru":1},
               {"ita":1,"eng":0},{"civ":3,"jpn":2},{"sui":2,"ecu":2},
               {"fra":3,"hon":1},{"bih":0,"arg":2},{"ger":0,"por":1},
               {"nga":3,"irn":0},{"usa":3,"gha":0},{"bel":4,"alg":0},
               {"rus":3,"kor":3},{"bra":2,"mex":4},{"ned":1,"aus":1},
               {"esp":3,"chi":2},{"cro":1,"cmr":2},{"civ":4,"col":5},
               {"eng":0,"uru":2},{"gre":0,"jpn":2},{"ita":3,"crc":0},
               {"fra":2,"sui":1},{"hon":1,"ecu":4},{"arg":6,"irn":0},
               {"ger":2,"gha":1},{"bih":2,"nga":1},{"rus":2,"bel":4},
               {"alg":0,"kor":0},{"usa":3,"por":0},{"ned":0,"chi":0},
               {"esp":1,"aus":0},{"cmr":0,"bra":2},{"mex":1,"cro":2},
               {"ita":2,"uru":1},{"eng":1,"crc":0},{"col":2,"jpn":0},
               {"gre":0,"civ":2},{"nga":0,"arg":2},{"bih":2,"irn":1},
               {"sui":1,"hon":0},{"fra":1,"ecu":1},{"gha":1,"por":1},
               {"usa":3,"ger":0},{"bel":3,"kor":1},{"rus":1,"alg":0},
//             Round 4
               {},{},{},
               {},{},{},
               {},{},{},
               {},{},{},
               {},{},{},
               {}
               ];

function matchSimulator(matches, startMatchNumber, endMatchNumber) {
    var matchScore = [];
    for(i=startMatchNumber-1;i<endMatchNumber;i++) {
        for(matchKey in matches[i]) {
            matches[i][matchKey] = Math.floor(Math.random() * (6-0+1));
            if(startMatchNumber > 48) {
                matchScore.push(matches[i][matchKey]);
            }
        };
        if(matchScore.length > 0 && matchScore[0] === matchScore[1]) {
            return matchSimulator(matches, i + 1, endMatchNumber);
        };
        matchScore = [];
    };
    return matches;
};

function groupChart(group, theChart) {
    for(groupKey in group) {
        for(i=0;i<theChart['series'].length;i++) {
            if(theChart['series'][i]['text'] === groupKey) {
                for(j=0;j<7;j++) {
                    theChart['series'][i]['rank'].push(group[groupKey]['rank'][j]);
                };
            };
        };
    };
    return theChart;
};

//var matches = [];
//var match = {};
//matches = createMatches(matches);
var count = 0;
for(i=0;i<matches.length;i++) {
    count += 1;
//    console.log('Match # ' +count+ JSON.stringify(matches[i]));
};

var theChart = {
      'type': 'rankflow',
      'scale-x': {
        'labels': [],
        'values': []
      },
      'series': [],
      'options': {
        'color-type': 'palette',
        //'palette': ['#FAFA05', ,'#019406', '#FA0505', '#0032FA'],
        'palette': ['yellow', 'green', 'grey', 'red'],
        'style': {'item-flow': {'color': 'black'}, 'item-overall': {'color': 'black'}}
        },
      'images': [
        {
          'src': './us.png',
          'x': '100px',
          'y': '360px'
        }
      ]
};
for(i=0;i<=7;i++) {
    theChart['scale-x']['labels'].push('Match ' + (i+1));
    theChart['scale-x']['values'].push('Match ' + (i+1));
};
var group;
var groupDict = {'a':null,'b':null,'c':null,'d':null,
                 'e':null,'f':null,'g':null,'h':null};
var bigGroupDict = {};
for(i=0;i<48;i++) {
    for(key in matches[i]) {
        matches[key] = 0;
    };
};

for(key in groupDict) {
    groupDict[key] = getGroup(key);
    for(bigGroupKey in groupDict[key]) {
        bigGroupDict[bigGroupKey] = groupDict[key][bigGroupKey];
        theChart['series'].push({
                                'text':bigGroupKey,
                                'rank':[]
                               });
    };
    matches = matchSimulator(matches, 1, 16);
    groupDict[key] = refreshData(groupDict[key], matches, '1');
    groupDict[key] = groupSorter(groupDict[key]);
    matches = matchSimulator(matches, 17, 32);
    groupDict[key] = refreshData(groupDict[key], matches, '2');
    groupDict[key] = groupSorter(groupDict[key]);
    matches = matchSimulator(matches, 33, 48);
    groupDict[key] = refreshData(groupDict[key], matches, '3');
    groupDict[key] = groupSorter(groupDict[key]);
    console.log(JSON.stringify(groupDict[key]));
    document.writeln('Group ' + key + '<br>');
    writeGroup(groupDict[key]);
    matches = roundFourMatches(groupDict[key], matches, key);
};
matches = matchSimulator(matches, 49, 56);
bigGroupDict = refreshData(bigGroupDict, matches, '4');
bigGroupDict = groupSorter(bigGroupDict);
matches = knockoutMatches(bigGroupDict, matches, 5);
matches = matchSimulator(matches, 57, 60);
bigGroupDict = refreshData(bigGroupDict, matches, '5');
bigGroupDict = groupSorter(bigGroupDict);
matches = knockoutMatches(bigGroupDict, matches, 6);
matches = matchSimulator(matches, 61, 62);
bigGroupDict = refreshData(bigGroupDict, matches, '6');
bigGroupDict = groupSorter(bigGroupDict);
matches = knockoutMatches(bigGroupDict, matches, 7);
matches = matchSimulator(matches, 63, 64);
bigGroupDict = refreshData(bigGroupDict, matches, '7');
bigGroupDict = groupSorter(bigGroupDict);
bigGroupDict = sortFinal(bigGroupDict, matches);
theChart = groupChart(bigGroupDict, theChart);

//console.log(JSON.stringify(groupDict));

for(key in bigGroupDict){
    document.writeln(key +' finished in place '+ bigGroupDict[key]['place']+'<br>');
};
for(i=0;i<matches.length;i++) {
    document.writeln('Match '+(i+1)+': '+JSON.stringify(matches[i])+'<br>');
};

document.writeln(JSON.stringify(theChart));


/*
window.onload=function() {

  zingchart.render({
    id: 'theChart',
    height: 450,
  
    data: theChart
  })
};
*/
