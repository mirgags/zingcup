var teams = [
    {"id":"gre","title":"Greece","code":"GRE","group":"c",'ranking':12,'color1':'#000000','color2':'#5499dd','color3':'#ffffff'},
    {"id":"rus","title":"Russia","code":"RUS","group":"h",'ranking':19,'color1':'#ffffff','color2':'#b13823','color3':'#4365b1'},
    {"id":"ned","title":"Netherlands","code":"NED","group":"b",'ranking':15,'color1':'#000000','color2':'#de6200','color3':'#ffffff'},
    {"id":"ger","title":"Germany","code":"GER","group":"g",'ranking':2,'color1':'#b13925','color2':'#f3cd00','color3':'#ffffff'},
    {"id":"por","title":"Portugal","code":"POR","group":"g",'ranking':4,'color1':'#5f9a4a','color2':'#b13925','color3':'#ffffff'},
    {"id":"esp","title":"Spain","code":"ESP","group":"b",'ranking':1,'color1':'#f4ed1b','color2':'#bf1f1e','color3':'#ffffff'},
    {"id":"ita","title":"Italy","code":"ITA","group":"d",'ranking':9,'color1':'#000000','color2':'#5f9a4a','color3':'#b13925'},
    {"id":"cro","title":"Croatia","code":"CRO","group":"a",'ranking':18,'color1':'#000000','color2':'#ce1d1c','color3':'#2e3c8e'},
    {"id":"fra","title":"France","code":"FRA","group":"e",'ranking':17,'color1':'#000000','color2':'#b13925','color3':'#2e3c8e'},
    {"id":"eng","title":"England","code":"ENG","group":"d",'ranking':10,'color1':'#000000','color2':'b13925','color3':'#ffffff'},
    {"id":"sui","title":"Switzerland","code":"SUI","group":"e",'ranking':6,'color1':'#000000','color2':'#b13925','color3':'#ffffff'},
    {"id":"bel","title":"Belgium","code":"BEL","group":"h",'ranking':11,'color1':'#f3cd00','color2':'#b13925','color3':'#ffffff'},
    {"id":"bih","title":"Bosnia-Herzegovina","code":"BIH","group":"f",'ranking':21,'color1':'#000000','color2':'#2d2c75','color3':'#ffffff'},
    {"id":"alg","title":"Algeria","code":"ALG","group":"h",'ranking':22,'color1':'#000000','color2':'#5f9a4a','color3':'#b13925'},
    {"id":"civ","title":"C\u00f4te d'Ivoire","code":"CIV","group":"c",'ranking':23,'color1':'#000000','color2':'#d8661a','color3':'#5f9a4a'},
    {"id":"gha","title":"Ghana","code":"GHA","group":"g",'ranking':37,'color1':'#f3cc00','color2':'#5e9911','color3':'#b23500'},
    {"id":"cmr","title":"Cameroon","code":"CMR","group":"a",'ranking':56,'color1':'#f3cc00','color2':'#5e9911','color3':'#b23500'},
    {"id":"nga","title":"Nigeria","code":"NGA","group":"f",'ranking':44,'color1':'#000000','color2':'#4d8947','color3':'#ffffff'},
    {"id":"mex","title":"Mexico","code":"MEX","group":"a",'ranking':20,'color1':'#000000','color2':'#ce1d1c','color3':'#539549},
    {"id":"usa","title":"United States","code":"USA","group":"g",'ranking':13,'color1':'#000000','color2':'#ce1d1c','color3':'#2f3391'},
    {"id":"hon","title":"Honduras","code":"HON","group":"e",'ranking':33,'color1':'#000000','color2':'#4365b1','color3':'#ffffff'},
    {"id":"crc","title":"Costa Rica","code":"CRC","group":"d",'ranking':28,'color1':,'color2':,'color3':},
    {"id":"arg","title":"Argentina","code":"ARG","group":"f",'ranking':5,'color1':,'color2':,'color3':},
    {"id":"bra","title":"Brazil","code":"BRA","group":"a",'ranking':3,'color1':,'color2':,'color3':},
    {"id":"chi","title":"Chile","code":"CHI","group":"b",'ranking':14,'color1':,'color2':,'color3':},
    {"id":"uru","title":"Uruguay","code":"URU","group":"d",'ranking':7,'color1':,'color2':,'color3':},
    {"id":"col","title":"Colombia","code":"COL","group":"c",'ranking':8,'color1':,'color2':,'color3':},
    {"id":"ecu","title":"Ecuador","code":"ECU","group":"e",'ranking':26,'color1':,'color2':,'color3':},
    {"id":"aus","title":"Australia","code":"AUS","group":"b",'ranking':62,'color1':,'color2':,'color3':},
    {"id":"jpn","title":"Japan","code":"JPN","group":"c",'ranking':46,'color1':,'color2':,'color3':},
    {"id":"kor","title":"South Korea","code":"KOR","group":"h",'ranking':57,'color1':,'color2':,'color3':},
    {"id":"irn","title":"Iran","code":"IRN","group":"f",'ranking':43,'color1':,'color2':,'color3':}]
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
                    group[sortFinalKey]['ranks'][6] = 3;
                    group[sortFinalKey]['place'] = 3;
                }
                else {
                    group[sortFinalKey]['ranks'][6] = 4;
                    group[sortFinalKey]['place'] = 4;
                };
            };
            if(sortFinalKey in matches[63]) {
                if(pointCounter(group[sortFinalKey]['matches'][6])===3) {
                    group[sortFinalKey]['ranks'][6] = 1;
                    group[sortFinalKey]['place'] = 1;
                }
                else {
                    group[sortFinalKey]['ranks'][6] = 2;
                    group[sortFinalKey]['place'] = 2;
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
        if (a.matches.length === 0 && b.matches.length === 0) {
            if(a.ranking > b.ranking) {
                return -1;
            }
            else {
                return 1;
            };
        };
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
        group[orderedList[i].id]['ranks'].push(i + 1);
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
            group[teams[j].id] = {matches:[],points:0,place:null,ranks:[],
                                  goals:0,goalDiff:0,id:teams[j].id,
                                  ranking:teams[j].ranking};
//            console.log('getGroup ' + groupLetter + ':' + teams[j].id);
        };
    };
    return group;
};

function getFifaOrder(group) {
    var group = group;
    var orderedList = [];
    for(y=0;y<group.length;y++) {
        orderedList.push(group[y]);
    };
    orderedList = orderedList.sort(function(a,b) {
        if(a.ranking > b.ranking) {
            return 1;
        }
        else {
            return -1;
        };
    });
    return orderedList;
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
                for(z=0;z<teams.length;z++) {
                    if(groupKey === teams[z]['id']) {
                        theChart['series'][i]['text'] = teams[z]['title'] +
                            ' (' + teams[z]['ranking'] + ')';
                        theChart['series'][i]['border-color'] = teams[z]['color1']

                        theChart['series'][i]['border-color'] = teams[z]['color2']
                        theChart['series'][i]['border-width'] = 2;
                    };
                };
                for(j=0;j<7;j++) {
                     theChart['series'][i]['ranks'].push(group[groupKey]['ranks'][j]);
                     
                };
                for(m=0;m<group[groupKey]['matches'];m++) {
                    theChart['series'][i]['data-matches'].push(groupKey +
                        group[groupKey]['matches'][m]['goalsFor'] + ':' +
                        group[groupKey]['matches'][m]['goalsAgainst']+' '+
                        group[groupKey]['matches'][m]['opponent'] );
                };
                theChart['series'][i]['tooltip']['text']='%data-matches';
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
        'labels': ['Group Match 1','Group Match 2','Group Match 3',
                   'Round of 16', 'Quarterfinal', 'Semifinal','Final'],
        'values': ['Group Match 1','Group Match 2','Group Match 3',
                   'Round of 16', 'Quarterfinal', 'Semifinal','Final']
      },
      'series': [],
      'options': {
        'color-type': 'palette',
        'palette': [],
        'style': {
            'item-flow': {'color': 'black'},
            'item-overall': {'color': 'black'},
            'label-overall':{'text':'FIFA World Ranking\n(Rank)'}}
        },
      'plotarea':{
        'background-image':'./maracana.png',
        'background-fit':'xy'
      },
      'images': [
/*
        {
          'src': './us.png',
          'x': '100px',
          'y': '360px'
        }
*/
      ]
};

/*
for(i=0;i<7;i++) {
    theChart['scale-x']['labels'].push('Match ' + (i+1));
    theChart['scale-x']['values'].push('Match ' + (i+1));
};
*/
var chartDict = {};
var group;
var groupDict = {'a':null,'b':null,'c':null,'d':null,
                 'e':null,'f':null,'g':null,'h':null};
var bigGroupDict = {};
for(i=0;i<48;i++) {
    for(key in matches[i]) {
        matches[key] = 0;
    };
};

var fifaList = getFifaOrder(teams);
for(i=0;i<fifaList.length;i++) {
    theChart['series'].push({
                            'text':fifaList[i].id,
                            'ranks':[],
                            'data-matches':[],
                            'tooltip':{},
                            'rank':i+1
                            });
};

for(key in groupDict) {
    groupDict[key] = getGroup(key);
    for(bigGroupKey in groupDict[key]) {
        bigGroupDict[bigGroupKey] = groupDict[key][bigGroupKey];
    };
};

for(key in groupDict) {
    groupDict[key] = getGroup(key);
/*    for(bigGroupKey in groupDict[key]) {
        bigGroupDict[bigGroupKey] = groupDict[key][bigGroupKey];
        theChart['series'].push({
                                'text':bigGroupKey,
                                'rank':[]
                               });
    };*/
    matches = matchSimulator(matches, 1, 16);
    groupDict[key] = refreshData(groupDict[key], matches, '1');
    groupDict[key] = groupSorter(groupDict[key]);
    matches = matchSimulator(matches, 17, 32);
    groupDict[key] = refreshData(groupDict[key], matches, '2');
    groupDict[key] = groupSorter(groupDict[key]);
    matches = matchSimulator(matches, 33, 48);
    groupDict[key] = refreshData(groupDict[key], matches, '3');
    groupDict[key] = groupSorter(groupDict[key]);
/*
    console.log(JSON.stringify(groupDict[key]));
    document.writeln('Group ' + key + '<br>');
    writeGroup(groupDict[key]);
    chartDict[key] = groupChart(groupDict[key], theChart);
*/
    matches = roundFourMatches(groupDict[key], matches, key);
};
matches = matchSimulator(matches, 49, 56);
bigGroupDict = refreshData(bigGroupDict, matches, '1');
bigGroupDict = groupSorter(bigGroupDict);
bigGroupDict = refreshData(bigGroupDict, matches, '2');
bigGroupDict = groupSorter(bigGroupDict);
bigGroupDict = refreshData(bigGroupDict, matches, '3');
bigGroupDict = groupSorter(bigGroupDict);
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
console.log(JSON.stringify(theChart));
/*
for(key in bigGroupDict){
    document.writeln(key +' finished in place '+ bigGroupDict[key]['place']+'<br>');
};
for(i=0;i<matches.length;i++) {
    document.writeln('Match '+(i+1)+': '+JSON.stringify(matches[i])+'<br>');
};

document.writeln(JSON.stringify(theChart));
*/

window.onload=function() {
//  for(key in chartDict) {
      zingchart.render({
        id: 'theChart',
        height: 1000,
        width: 1500,
        data:theChart
//        data: chartDict[key]
      })
//  };
};

console.log('bullshit');
