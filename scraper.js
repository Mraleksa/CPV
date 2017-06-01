var client = require('http-api-client');
const fs = require('fs');


var currentCount =  "2017-01-01T00:00:00.000000+03:00"
var p=0; var p2=0;
var end = +new Date(currentCount)+86400000*10
   
   
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
//var res = '{"key":"'+data.getJSON().data.items[0].description+'","cpv":"'+data.getJSON().data.items[0].classification.id+'"},'				
				
					
db.serialize(function() {

  // Create new table
 //db.run("CREATE TABLE IF NOT EXISTS data (id TEXT)");
 db.run("CREATE TABLE IF NOT EXISTS data (key TEXT,cpv TEXT)");						
						 // Insert a new record
  //var statement = db.prepare("INSERT INTO data(id) VALUES (?)");
  var statement = db.prepare("INSERT INTO data VALUES (?,?)");	
	
 // statement.run( res);
  statement.run(data.getJSON().data.items[0].description,data.getJSON().data.items[0].classification.id);	
  statement.finalize();
	
});
					})
					.catch(function  (error) {
						console.log("error_detale")
						
					});  
				});
		
		})
		.then(function () {	
		if (p<2){piv ();}		
		else {
			console.log("stop")
				p=0;
				p2++;
				console.log(p2)
			setTimeout(function() {
			
				if (p2 < 1) {
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
