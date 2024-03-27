'use strict'
import WebTorrent from 'webtorrent-hybrid'
import fs from 'fs'
const torrentId = process.argv[2]
console.log(('Torrent Id :', torrentId))
const client = new WebTorrent()

client.add(torrentId, (torrent) => {
  const files = torrent.files
  let length = files.length
  console.log('No of files :', length)
  files.forEach((file) => {
    const source = file.createReadStream()
    const destination = fs.createWriteStream(file.name)
    source
      .on('end', () => {
        console.log('file:', file.name)
        length = length - 1
        if (!length) process.exit()
      })
      .pipe(destination)
  })
})
