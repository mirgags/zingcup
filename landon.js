var theChart = {"type":"bar",
                "series":[{"values":[1,1,1,0]}],
                "scale-x":{
                "label":{
                    "text":"World Cup Year"
                    },
                  "values":["2002","2006","2010","2014"]
                  },
                "scale-y":{
                  "label":{
                    "text":"Number of Landon Donovans on US Team"
                  }
                },
                "images":[{
                  "src":"./landon.jpeg",
                  "x":"409px",
                  "y":"0px"}]
               };
window.onload=function() {
  zingchart.render({
    id: 'theChart',
    height: 450,
    width: 600,
    data: theChart
  })
};
