var client = require('http-api-client');
const fs = require('fs');
var sqlite3 = require("sqlite3").verbose();

// Open a database handle
var db = new sqlite3.Database("data.sqlite");

var currentCount =  "2017-01-02T18:02:00.391786+02:00"
var p=0; var p2=0;
   
   
function piv(){  
p++;
client.request({url: 'https://public.api.openprocurement.org/api/2.3/contracts?offset='+currentCount})
		.then(function (data) {
						 
		
			var dataset = data.getJSON().data;
			
			currentCount = data.getJSON().next_page.offset;			
			console.log(currentCount)
			
			return dataset;
		})	
		.then(function (dataset) {	
		
			dataset.forEach(function(item) {
				client.request({url: 'https://public.api.openprocurement.org/api/2.3/contracts/'+item.id})
					.then(function (data) {
				
/*				
var res = '{"key":"'+data.getJSON().data.items[0].description+'","cpv":"'+data.getJSON().data.items[0].classification.id+'"},'
//console.log(res);
//console.log(data.getJSON().data.items[0].description.classification.id);
fs.appendFile("test.json", res);
*/

db.serialize(function() {

  // Create new table
  db.run("CREATE TABLE IF NOT EXISTS data (key TEXT,cpv TEXT)");

  
  // Insert a new record
  var statement = db.prepare("INSERT INTO data VALUES (?,?)");
  
  statement.run(data.getJSON().data.items[0].description,data.getJSON().data.items[0].classification.id);
 
// console.log(data.getJSON().data.contractID)
  //else none;
  
  statement.finalize();
});




			
					})
					.catch(function  (error) {
						console.log("error_detale")
						
					});  
				});
		
		})
		.then(function () {	
		if (p<10){piv ();}		
		else {
			console.log("stop")
				p=0;
				p2++;
				console.log(p2)
			setTimeout(function() {
			
				if (p2 < 200) {
					piv ();
				}
				else {console.log("STOP")}
				}, 5000);
		}		
							
		})
		.catch( function (error) {
		console.log("error")
		piv ();
		});   
		
		
			

}

piv ();	
 

   
//node_modules\http-api-client
