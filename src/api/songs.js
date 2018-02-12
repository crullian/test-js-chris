//
// Ugh! More bit rot and deletions.
// Halp!!!
//
const { createReadStream, writeFile } = require('fs');
const path = require('path');
const { get } = require('https');

const fileDir = path.resolve(__dirname, '../api/data')

exports.songs = songs;
exports.refreshSongs = refreshSongs;

function songs() {
  return new Promise((resolve, reject) => {
    // * read songs file
    // * handle "no such file" errors
    let rawData = '';
    const songReadStream = createReadStream(fileDir + "/songs.json", {encoding: 'utf-8'});
    songReadStream.on('error', error => {
      console.error(error);
      reject(error)
      // refreshSongs();
      // songs();
    });
    songReadStream.on('data', data => {
      rawData += data;
    });
    songReadStream.on('close', () => {
      resolve(rawData);
    })
  })
}

async function refreshSongs() {
  const songs = await getSongs()
  const formattedSongs = formatSongs(songs)

  const fileContent = JSON.stringify(formattedSongs);

  return new Promise((resolve, reject) => {
    // write .json file to fileDir/songs.json
    writeFile(fileDir + "/songs.json", fileContent, (err) => {
      if (err) {
        console.error(err);
        reject();
        return;
      };
      console.log("File has been updated");
      resolve();
    });
  })
}

async function getSongs() {
  const page1 = 'https://itunes.apple.com/search?country=us&media=music&limit=50&attribute=songTerm&term=door&sort=ratingIndex'
  const page2 = 'https://itunes.apple.com/search?country=us&media=music&limit=50&offset=50&attribute=songTerm&term=steps&sort=ratingIndex'

  const resArray = await Promise.all([
    iTunesReq(page1),
    iTunesReq(page2)
  ]).catch(console.error)

  return resArray.reduce((previous, current) => [...previous, ...current], []);
}

function iTunesReq(url = '') {
  return new Promise((resolve, reject) => {
    get(url, res => {
      const { statusCode } = res

      // e͠r̕ror̴ ha̴nd͏ling̸
      if (statusCode !== 200) {
        throw new Error(`iTunes Request Failed.\n Status Code: ${statusCode}`);
      }

      let rawData = '';
      res.setEncoding("utf8");
      res.on('data', chunk => {
        rawData += chunk;
      })

      res.on('end', () => {
        try {
          const json = JSON.parse(rawData);
          resolve(json.results);
        } catch(error) {
          throw new Error(error);
        }
      })
    }).on('error', reject)
  })
}

// Whew, this part seems ok.
function formatSongs(songs = []) {
  // copying songs so original is not mutated
  return [...songs].sort((one, two) => {
    // adding releaseYear in sort if non-existant
    if (!one.releaseYear) one.releaseYear = parseInt(one.releaseDate, 10)
    if (!two.releaseYear) two.releaseYear = parseInt(two.releaseDate, 10)

    // sorting first by year, then title
    const yearDifference = one.releaseYear - two.releaseYear

    if (yearDifference !== 0) return yearDifference
    if (one.trackName < two.trackName) return -1
    if (one.trackName > two.trackName) return 1

    return 0
  })
}
