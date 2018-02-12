//
// Looks like we have a bunch of bit rot and deletions.
// Can you help us out?
//
const { createServer } = require('http');
const { parse: parseUrl } = require('url');
const { createGzip } = require('zlib');
const { createReadStream } = require('fs');
const { songs, refreshSongs } = require('./songs');

const PORT = 4000;

const server = createServer(({ headers, method, url }, res) => {
  const baseResHeaders = {
    // CORS stuff is gone. :(
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "content-type, accept",
  }
  console.log('\x1b[33m%s\x1b[0m', 'Res buddy', method);
  console.log('\x1b[36m%s\x1b[0m', 'URL', url);
  // Routing ¯\_(ツ)_ /¯
  //
  // We need the following two endpoints
  // GET /songs
  // GET /refresh-songs
  //
  // All endpoints should return JSON with the correct headers
  //
  // /songs should...
  //   * stream data from a src/data/songs.json file
  //   * not crash the server if that file doesn't exist
  //   * ^ bonus points for triggering refresh code in this case
  //   * bonus points for compressing the response

  if (url === '/songs') {
    console.log('Hitting /songs');
    // send up songs json
    songs().then(data => {
      console.log('\x1b[36m%s\x1b[0m', 'GOT THE DATA??????__________________________');
      // createReadStream(data).pipe(createGzip()).pipe(res); // compression?
      var status = 200;
      res.writeHead(status, baseResHeaders);
      res.write(data);
      res.end();
    }).catch(err => {
      console.log('ROUTER ERRORRRR', err.message)
      if (err.code === 'ENOENT') { // if error is for file not found
        refreshSongs().then(() => { // Hit refresh to hit iTunes again and write a new json file
          // hmmm, and then hit songs again to get the data and send it up to the client?
          songs().then(data => {
            console.log('\x1b[36m%s\x1b[0m', 'INSIDE SONGS AFTER REFRESH')
            var status = 200;
            res.writeHead(status, baseResHeaders);
            res.write(data);
            res.end();
          }).catch(err => console.error(err));
        })
      }
    });
  }

  // /refresh-songs should...
  //   * not hold the response while songs are being refreshed
  //   * return a 202 status code with some relevant JSON response
  //   * continue getting songs from iTunes
  //   * frontend should have UI/button to trigger this endpoint

  if (url === '/refreshSongs') {
    console.log('Hitting /refreshSongs');
    // refresh the json file
    refreshSongs().then(() => {
      // Hit songs again to read the file and get the data and send it to client
      songs().then(data => {
        var status = 202;
        res.writeHead(status, baseResHeaders);
        res.write(data);
        res.end();
      }).catch(err => console.log(err));
    });
  }

})

server.listen(PORT)
server.on('listening', () => {
  console.log(`Server running at http://localhost:${PORT}/`)
})
