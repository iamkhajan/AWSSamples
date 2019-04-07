var http = require('http')
module.exports = {
    httpGet: function(query, callback) {
        return new Promise(((resolve, reject) => {
          var options = {
              host: 'numbersapi.com',
              path: '/3',
              method: 'GET',
          };
          console.log('function called')
          //path: '/' + encodeURIComponent(query),
          const request = http.request(options, (response) => {
            response.setEncoding('utf8');
            let returnData = '';
      
            response.on('data', (chunk) => {
              returnData += chunk;
            });
      
            response.on('end', () => {
              console.log('function called with response '+ returnData)
              resolve(returnData);
            });
      
            response.on('error', (error) => {
              reject(error);
            });
          });
          request.end();
        }));
      }
}
