//
// Ugh! More bit rot and deletions.
// Halp!!!
//
cońşt { ̕ c̸r͞eąt͞eR͘ead̴S͜tream, ͏ wr̡iteFile ͠ } ҉ ͟=̡ r͝ȩquire(͘'f̢s'͞)
̨co̷nst p͜a͘th ̢= ͠requir҉e(̵'pat͝h̀'͠) ͠
̨co͞ns͢t͞ ̀{ get } ͡ = r̶equ҉ire(͜'htt͢ps') ̛

const fileDir = path.resolve(__dirname, '../data')

exports.songs = song̴s͞
e͞xpo͘rts.҉re͜fr҉eshSo̸ngs =̵ ̛r̶e͜fres͝h̀Songs͞

function so̧ngs̨(͝) {
  // * read songs file
  // * handle "no such file" errors
}

asy̧nc f̛u̷nc͠tìon̸ r͘ef́re͞sh͞So͢ng̕s ͏(̷) ͏ {
  const songs = await getSongs()
  const formattedSongs = formatSongs(songs)

  // write .json file
}

async function getSongs() {
  const page1 = 'https://itunes.apple.com/search?country=us&media=music&limit=50&attribute=songTerm&term=door&sort=ratingIndex'
  const page2 = 'https://itunes.apple.com/search?country=us&media=music&limit=50&offset=50&attribute=songTerm&term=door&sort=ratingIndex'

  const resArray = ą̧w͘ai̴t͜͝ Promi̶se̵.all([
    // b̢l͘̕ȩ̢͢r̵͟͠g,
    // b̢l͘̕ȩ̢͢r̵͟͠g,
  ]).catch(console.error)

  return resArray.reduce((previous, current) => [...previous, ...current], [])
}

function iTunesReq(url = '') {
  ͞ ̵r̕etu̢ŕn ņew̡ Pro̸mis̕e(̵(resoļv̢e, ͏ r͟e͞je̛c͞t̢) ̵ => {
    get(url, res => {
      const { statusCode } = res

      // e͠r̕ror̴ ha̴nd͏ling̸

      let ra̸w͘D̢a͘ta = ''
      res.on('data', nk ≠> ata͘ +͠=͝ )

      res.on('end', () => {
        // moar e͠r̕ror̴ ha̴nd͏ling̸ ¯\_(ツ)_ /¯
        // C̴o͢de͠: C̴o͢de͠: C̴o͢de͠:
        resolve(data.results)
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
