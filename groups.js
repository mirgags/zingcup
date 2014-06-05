function getMatches(group, matches, roundNum) {
    roundDict = {'1':16,'2':32,'3':48,'4':56,'5':60,'6':62,'7':63};
    console.log('in getMatches()');
    console.log(JSON.stringify(group));
    for(key in group) {
        console.log('finding ' + key + ' matches');
        for(i=0; i < roundDict[roundNum]; i++) {
            if(key in matches[i]) {
                var theMatch = {};
                for(matchKey in matches[i]) {
                    if(key === matchKey) {
                        theMatch['goalsFor'] = matches[i][key];
                    }
                    else {
                        theMatch['goalsAgainst'] = matches[i][matchKey];
                        theMatch['opponent'] = matchKey;
                    };
                };
            group[key]['matches'].push(theMatch);
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

function groupSorter(group) {
    var orderedList = [];
    for(key in group) {
        orderedList.push(group[key]);
        console.log(group[key].id);
    };
    orderedList = orderedList.sort(function (a,b) {
        console.log('in points');
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
            console.log('in goalDiff');
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
            console.log('in goals scored');
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
            console.log('in head to head');
            if(b.id in a['matches']) {
                if(a.goalsFor > a.goalsAgainst) {
                    return -1;
                }
                if(a.goalsFor < a.goalsAgainst) {
                    return 1;
                }
            };
        };
        console.log('coin flipped');
        return Math.floor(Math.random() * (1 - 0 + 1))
    });
    for(i=0;i<orderedList.length;i++) {
        console.log(orderedList[i].id);
        group[orderedList[i].id]['place'] = i + 1;
    };
    return group;
};

function refreshData(group, matches, round) {
    console.log('refreshdata group: ' + JSON.stringify(group));
    for(key in group) {
        group[key]['matches'] = [];
    };
    group = getMatches(group, matches, round);
    for(key in group) {
        group[key]['points'] = pointTotal(group[key]);
        group[key]['goals'] = goalsScored(group[key]); 
        group[key]['goalDiff'] = goalDifference(group[key]);
    };
    return group;
};

function writeGroup(group) {
    for(key in group) {
        for(i=0; i < group[key]['matches'].length; i++) {
            document.writeln(key+' v ' +group[key]['matches'][i]['opponent']+' - ');
            document.writeln('scored: ' +group[key]['matches'][i]['goalsFor']);
            document.writeln('allowed: '+group[key]['matches'][i]['goalsAgainst'] + '<br>');
            };
        document.writeln(key+' total points: ' + group[key]['points'] + '<br>' + key + ' finished in position: ' + group[key]['place'] + "<br><br>");
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
                        console.log('added:'+teams[i]['id']+','+
                                            teams[j]['id']);
                        addMatch = false;
                    };
                };
            };
        };
    };
    return matches;
};
//still working on this
function overallSort(group) {
    var winnerDict = {};
    var loserDict = {};
    var returnDict = {};
    for(key in group) {
        if(group[key]['matches'].length < 4) {
            loserDict[key] = group[key];
        }
        else {
            winnerDict[key] = group[key];
        };
    };
    loserDict = groupSorter(loserDict);
    console.log('loserdict: ' + JSON.stringify(loserDict));
    for(key in loserDict) {
        loserDict[key]['place'] = loserDict[key]['place'] + 16;
        returnDict[key] = loserDict[key];
    };
    winnerDict = groupSorter(winnerDict);
    for(key in winnerDict) {
        returnDict[key] = loserDict[key];
    };
    return returnDict;
};

function getGroup(groupLetter) {
    var group = {};
    for(j=0;j<teams.length;j++) {
        if(groupLetter === teams[j].group) {
            group[teams[j].id] = {matches:[],points:0,place:null,
                                  goals:0,goalDiff:0,id:teams[j].id};
            console.log('getGroup ' + groupLetter + ':' + teams[j].id);
        };
    };
    console.log(JSON.stringify(group));
    for(key in group) {
        console.log(JSON.stringify(group[key]));
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
               {"usa":3,"ger":0},{"bel":3,"kor":1},{"rus":1,"alg":0}];

//var matches = [];
//var match = {};
//matches = createMatches(matches);
var count = 0;
for(i=0;i<matches.length;i++) {
    count += 1;
    console.log('Match # ' +count+ JSON.stringify(matches[i]));
};

var group;
var groupDict = {'a':null,'b':null,'c':null,'d':null,
                 'e':null,'f':null,'g':null,'h':null};
console.log(JSON.stringify(matches));

//THIS DOESNT WORK
for(key in groupDict) {
    groupDict[key] = getGroup(key);
    console.log('nonfunc group: ' + JSON.stringify(groupDict[key]));
    groupDict[key] = refreshData(groupDict[key], matches, '3');
    groupDict[key] = groupSorter(groupDict[key]);
    console.log(JSON.stringify(groupDict));
    writeGroup(groupDict[key]);
};

/*
for(i=0;i<15;i++){matches.push({})};
console.log('matches length: ' + matches.length);
//THIS WORKS
group = getGroup('a');
group = refreshData(group, matches, '3');
group = groupSorter(group);
writeGroup(group);

for(key in group) {
    groupDict[key] = group[key];
    if(groupDict[key]['place'] === 1) {
        matches[48][key] = 0;
    }
    if(groupDict[key]['place'] === 2) {
        matches[49][key] = 0;
    }

};

group = getGroup('b');
group = refreshData(group, matches, '3');
group = groupSorter(group);
writeGroup(group);

for(key in group) {
    groupDict[key] = group[key];
    if(groupDict[key]['place'] === 1) {
        matches[49][key] = 0;
    }
    if(groupDict[key]['place'] === 2) {
        matches[48][key] = 0;
    }

};

group = getGroup('c');
group = refreshData(group, matches, '3');
group = groupSorter(group);
writeGroup(group);

for(key in group) {
    groupDict[key] = group[key];
    if(groupDict[key]['place'] === 1) {
        matches[50][key] = 0;
    }
    if(groupDict[key]['place'] === 2) {
        matches[51][key] = 0;
    }

};

group = getGroup('d');
group = refreshData(group, matches, '3');
group = groupSorter(group);
writeGroup(group);

for(key in group) {
    groupDict[key] = group[key];
    if(groupDict[key]['place'] === 1) {
        matches[51][key] = 0;
    }
    if(groupDict[key]['place'] === 2) {
        matches[50][key] = 0;
    }

};

group = getGroup('e');
group = refreshData(group, matches, '3');
group = groupSorter(group);
writeGroup(group);

for(key in group) {
    groupDict[key] = group[key];
    if(groupDict[key]['place'] === 1) {
        matches[52][key] = 0;
    }
    if(groupDict[key]['place'] === 2) {
        matches[53][key] = 0;
    }

};

group = getGroup('f');
group = refreshData(group, matches, '3');
group = groupSorter(group);
writeGroup(group);

for(key in group) {
    groupDict[key] = group[key];
    if(groupDict[key]['place'] === 1) {
        matches[53][key] = 0;
    }
    if(groupDict[key]['place'] === 2) {
        matches[52][key] = 0;
    }

};

group = getGroup('g');
group = refreshData(group, matches, '3');
group = groupSorter(group);
writeGroup(group);

for(key in group) {
    groupDict[key] = group[key];
    if(groupDict[key]['place'] === 1) {
        matches[54][key] = 0;
    }
    if(groupDict[key]['place'] === 2) {
        matches[55][key] = 0;
    }

};

group = getGroup('h');
group = refreshData(group, matches, '3');
group = groupSorter(group);
writeGroup(group);

for(key in group) {
    groupDict[key] = group[key];
    if(groupDict[key]['place'] === 1) {
        matches[55][key] = 0;
    }
    if(groupDict[key]['place'] === 2) {
        matches[54][key] = 0;
    }

};
var overallGroup = refreshData(overallGroup, matches, '4');
overallGroup = overallSort(groupDict);
console.log(JSON.stringify(overallGroup));
for(key in overallGroup) {
    console.log('overall key: ' + key);
    console.log(key + 'finished' + overallGroup[key]['place']);
};
*/
