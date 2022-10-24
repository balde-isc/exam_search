/**
 * The Server Can be configured and created here...
 * 
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data = require('./data');
const http = require('http');
const url = require('url');

const hostname = 'localhost';
const port = 3035;
const totalElemProducts = 4;
/** 
 * Start the Node Server Here...
 * 
 * The http.createServer() method creates a new server that listens at the specified port.  
 * The requestListener function (function (req, res)) is executed each time the server gets a request. 
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */

/**
 * 
 * @param {string} value Value search products
 * @return {Array} Return firts 4 filter list products
 */
const filterSearch = (value) => data.filter((product) => {
    const valueParse = value.toLowerCase();
    return (product.name.toLowerCase().includes(valueParse) || product.about.toLowerCase().includes(valueParse)) && product.isActive === "true"
}).slice(0, totalElemProducts);

/**
 * 
 * @return {Number} Return total products active
 */
const getTotalProducts = () => data.filter((product) => product.isActive === "true").length;


http.createServer(function (req, res) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        /** add other headers as per requirement */
    };
    
    const params = url.parse(req.url, true);
    if (params.pathname === '/products') {
        const responseData = filterSearch(params.query.filter);
        const dataRes = {
            meta: {
                total: getTotalProducts(),
                displaying: responseData.length
            },
            data: responseData
        }
        res.writeHead(200, headers);
        res.end(JSON.stringify(dataRes));
        return
    }
    res.write("ok"); // Write out the default response
    res.end(); //end the response

}).listen(port);


console.log(`[Server running on ${hostname}:${port}]`);
