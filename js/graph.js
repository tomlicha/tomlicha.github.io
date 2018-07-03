
var csv
        function UserAction(){
$.ajax({
        url: 'https://84.7.38.34:443/collections/humiditysensor',
         success: function(data){
            //process the JSON data etc
            console.log(data[1]["date"]);
            alert((data[1]["date"]));
            csv = ConvertToCSV(data,["date","temperature","humidité","id\n"])
            console.log(csv);
            
        afficherGraphe(csv, options,"graph");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Error: please visit https://84.7.38.34:443/collections/humiditysensor to get the SSL certificate then try again" + errorThrown); 
        }   
})
}

function ConvertToCSV(objArray,headers) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        
        str+=headers;
        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','
                        line += array[i][index];
              
            }

            str += line + '\r\n';
        }

        return str;

    }

var afficherGraphe = function(csvfile, options, id_graphe) {

g = new Dygraph(

   // containing div
   document.getElementById(id_graphe),

   // CSV or path to a CSV file.
   csvfile,

   //Options
   options
 );
};

var options =     {  
          animatedZooms :true,
          title : 'Température et Humidité ambiante',
          titleHeight : 30,
          labelsGMT: true, 
          ylabel : "valeur mesurée (°C et %)",
          y2label:"seuils d'alerte",
          labelsSeparateLines :true,
          xlabel : "date de la mesure",
          legend:'follow',
          fillGraph: true,
          fillAlpha: 0.5,
          labelsDivStyles: {'textAlign': 'left'},
          colors : ['#86BBEE','#5FBA7D','#FF0000'],
           "series": {

            "Température °C": {
                "connectSeparatedPoints":true
               },

            "Humidité %": {
            "connectSeparatedPoints":true
            },

            "id": {
                "connectSeparatedPoints":true
               },
              
            },
            
                       
     };



