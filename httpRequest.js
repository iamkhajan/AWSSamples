var http = require('https')
module.exports = {
  httpGet: function(query, callback){
    var options = {
        host: 'api.github.com',
        path:  query,
        headers: {'User-Agent': "Mobile"},
        method: 'GET',
    };

    var req = http.request(options, res => {
        res.setEncoding('utf8');
        var responseString = "";
        
        //accept incoming data asynchronously
        res.on('data', chunk => {
            responseString = responseString + chunk;
        });
        
        //return the data when streaming is complete
        res.on('end', () => {
            var data = JSON.parse(responseString);
            console.log('callback function end '+data);
            callback(data);
        });

    });
    req.end();
}
}