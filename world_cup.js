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

var theChart = {
  'type': 'rankflow',
  'scale-x': {
    'labels': ['Match 1', 'Match 2', 'Match 3'],
    'values': ['Match 1', 'Match 2', 'Match 3']
  },
  'series': [
    {
      'text': 'Germany',
      'ranks': [2,1,3],
//      'rank': 1
    },
    {
      'text': 'Ghana',
      'ranks': [4,3,4],
//      'rank': 2
    },
    {
      'text': 'Portugal',
      'ranks': [3,4,2],
//      'rank': 3
    },
    {
      'text': 'USA',
      'ranks': [1,2,1],
//      'rank': 4
    }
  ],
  'options': {
    'color-type': 'palette',
    //'palette': ['#FAFA05', ,'#019406', '#FA0505', '#0032FA'],
    'palette': ['yellow', 'green', 'grey', 'red'],
    'style': {'item-flow': {'color': 'black'}, 'item-overall': {'color': 'black'}}
    },
  'images': [
    {
      'src': './de.png',
      'x': '100px',
      'y': '90px'
    },
    {
      'src': './gh.png',
      'x': '100px',
      'y': '180px'
    },
    {
      'src': './pt.png',
      'x': '100px',
      'y': '270px'
    },
    {
      'src': './us.png',
      'x': '100px',
      'y': '360px'
    }
  ]/*,
  'tooltip': {
    'text': '%d'
  };*/
};

window.onload=function() {

  zingchart.render({
    id: 'theChart',
    height: 450,
    width: 600,
    data: theChart
  })
};
