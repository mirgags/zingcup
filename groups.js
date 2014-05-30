function getMatches(group) {
    for(key in group) {
        for(i=0; i < matches.length; i++) {
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

function refreshData(group) {
    group = getMatches(group);
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
//                        console.log('empty entry');
                        addMatch = true;
                                            }
                    else {
                        addMatch = true;
                        for(k=0;k<matches.length;k++) {
//                            console.log('match # ' +k);
//                            console.log(JSON.stringify(matches[k]));
                            if(teams[j]['id'] in matches[k] && 
                               teams[i]['id'] in matches[k]) {
                                addMatch = false;
                            };
                        };
                    };
                    if(addMatch === true) {
                        matchStr = '{\"' +teams[i]['id'] + '\":0,\"' +
                            teams[j]['id'] + '\":0}';
//                        console.log('up next: ' + matchStr);
                        matches.push(JSON.parse(matchStr));
                        //matches[matches.length][teams[i]] = 0;
                        //matches[matches.length][teams[j]] = 0;
                        console.log('added:'+teams[i]['id']+','+
                                            teams[j]['id']);
                        addMatch = false;
                    };
                };
            };
        };
//        for(z=0;z>matches.length;z++){JSON.stringify(matches[z])};
    };
//    for(z=0;z<matches.length;z++){console.log(matches[z])};
    return matches;
};

var matches = [
    {usa:3,gha:0},{ger:0,por:0},{usa:3,por:0},{ger:0,gha:0},
    {usa:3,ger:0},{gha:1,por:1}
];
//var matches = [];
//var match = {};
matches = createMatches(matches);
var count = 0;
for(i=0;i<matches.length;i++) {
    count += 1;
    console.log('Match # ' +count+ JSON.stringify(matches[i]));
};

var groupList = ['a','b','c','d','e','f','g','h'];

for(i=0;i<groupList.length;i++) {
    var group = {};
    for(j=0;j<teams.length;j++) {
        if(groupList[i] === teams[j].group) {
            group[teams[j].id] = {matches:[],points:0,place:null,goals:0,goalDiff:0,id:teams[j].id};
        };
    };
    group = refreshData(group);
    group = groupSorter(group);
/*
    writeGroup(group);
*/
};


/*
var groupG = {ger:null,por:null,gha:null,usa:null};
    for(key in groupG) {
        groupG[key] = {matches:[],points:0,place:null,goals:0,goalDiff:0,id:key}
    };

groupG = refreshData(groupG);

groupG = groupSorter(groupG);

for(key in groupG) {
    for(i=0; i < groupG[key]['matches'].length; i++) {
        document.writeln(key+' v ' +groupG[key]['matches'][i]['opponent']+' - ');
        document.writeln('scored: ' +groupG[key]['matches'][i]['goalsFor']);
        document.writeln('allowed: '+groupG[key]['matches'][i]['goalsAgainst'] + '<br>');
        };
    document.writeln(key+' total points: ' + groupG[key]['points'] + '<br>' + key + ' finished in position: ' + groupG[key]['place'] + "<br><br>");
};
*/
