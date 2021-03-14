const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const fs = require('fs')

async function changeVersion () {
  const describe = await exec('git describe --tags')
  console.log(describe)
  const chunks = describe.stdout.split('-')
  const commitHash = chunks.pop().substring(1).trim()
  const distance = chunks.pop()
  let version = chunks.join('-').substring(1)
  if (distance !== '0') {
    version += `+${distance}-${commitHash}`
  }

  process.env.APP_VERSION = version
  fs.writeFile('version.txt', version, 'utf8', function (err) {
    if (err) return console.log(err)
  })
  process.env.LATEST_TAG_DISTANCE = distance
  fs.writeFile('tag_distance.txt', distance, 'utf8', function (err) {
    if (err) return console.log(err)
  })

  console.log(`version: ${version}`)
  console.log(`distance: ${distance}`)
  console.log(`commitHash: ${commitHash}`)

  fs.readFile('package.json', 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }

    let result = data.replace(/"version": ".*"/g, `"version": "${version}"`)
    result = result.replace(/"commitHash": ".*"/g, `"commitHash": "${commitHash}"`)

    fs.writeFile('package.json', result, 'utf8', function (err) {
      if (err) return console.log(err)
    })
    console.log(result)
  })
};

changeVersion()
