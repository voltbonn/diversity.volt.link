require('dotenv').config()

// const isDevEnvironment = process.env.environment === 'dev' || false
const path = require('path')
const url = require('url')

const http = require('http')

const express = require('express')
const rateLimit = require('express-rate-limit')

const { fetch } = require('cross-fetch')

const fs = require('fs')

const static_files_path = path.join(__dirname, './frontend/')
const cache_folder_path = path.join(__dirname, './cache/')

const volt_team_root_team_id = process.env.volt_team_root_team_id
const volt_team_root_team_name = process.env.volt_team_root_team_name

// create cache folder if it doesn't exist
if (!fs.existsSync(cache_folder_path)) {
  fs.mkdirSync(cache_folder_path)
}

// volt_team_api_key

function checkOrigin(origin){
  return (
    typeof origin === 'string'
    && (
      origin === 'volt.link'
      || origin.endsWith('://volt.link')

      // allow from subdomains
      || origin.endsWith('.volt.link')

      // allow for localhost
      || origin.endsWith('localhost:3000')
      || origin.endsWith('localhost:4000')
      || origin.endsWith('0.0.0.0:3000')
      || origin.endsWith('0.0.0.0:4000')
      || origin.endsWith('localhost:19006')
    )
  )
}

// function getUserLocales(){
//     const localesByCounty = {
//       de: ['de'],
//     }
//   // https://get.geojs.io/v1/ip/geo/{ip address}.json
// }

const app = express()

// set up rate limiter: maximum of 100 requests per minute
app.use(rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 1000, // Limit each IP to 1000 requests per `window` (here, per 1 minute)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})) // apply rate limiter to all requests

app.use(express.json())

app.use(function (req, res, next) {
  // const origin = req.get('origin')
  const origin = req.header('Origin')
  if (checkOrigin(origin)) {
    req.is_subdomain = true
    req.origin = origin
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Credentials', true)
  } else {
    req.is_subdomain = false
  }

  next()
})

app.options("/*", function (req, res, next) {
  // correctly response for cors
  if (req.is_subdomain) {
    res.setHeader('Access-Control-Allow-Origin', req.origin)
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    res.sendStatus(200)
  } else {
    res.sendStatus(403)
  }
})

app.get('/login', (req, res) => {
  res.redirect(url.format({
    pathname: '/auth/google',
    query: req.query,
  }))
})

function showClient(res, blocks = []) {
  // send index file to show client
  const index_file_path = static_files_path + '/index.html'

  // load index file
  fs.readFile(index_file_path, 'utf8', function (err, index_file) {
    if (err) {
      console.error(err)
      res.sendStatus(500)
    } else {
      let title = 'VoltLink'
      let description = 'VoltLink is an information-hub about Volt Europa.'
      let coverphoto_url = ''

      if (blocks.length > 0) {
        const block = blocks[0]

        if (
          block
          && block.hasOwnProperty('properties')
          && typeof block.properties === 'object'
          && block.properties !== null
        ) {
          if (
            block.properties.hasOwnProperty('text')
            && typeof block.properties.text === 'string'
            && block.properties.text.length > 0
          ) {
            title = block.properties.text
            description = ''
          }

          coverphoto_url = getImageUrl(block.properties.coverphoto)
          if (!coverphoto_url) {
            coverphoto_url = getImageUrl(block.properties.icon)
          }
        }

        if (coverphoto_url !== '') {
          coverphoto_url = `https://api.volt.link/download_url?f=jpg&w=1000&h=1000&url=${encodeURIComponent(coverphoto_url)}`
        }
      }

      const __SERVER_DATA__ = "JSON.parse(" + JSON.stringify(JSON.stringify({ preloaded_blocks: blocks })) + ")" // First stringify is to get arrays and objects represented correctly. Second stringify+parse to ease parsing of js code on the client.

      index_file = index_file
        .replace(/__META_TITLE__/g, title)
        .replace(/__META_DESCRIPTION__/g, description)
        .replace(/__META_COVERPHOTO__/g, coverphoto_url)
        .replace(/__SERVER_DATA__/g, __SERVER_DATA__)

      res.send(index_file)
    }
  })
}

function getParentTeams(team_id, all_teams = []) {
  const parents = []
  const this_parent_id = all_teams.find(team => team.id === team_id).parent_id
  const parent = all_teams.find(team => team.id === this_parent_id)

  // check if parent exists in parents array
  if (parent && !parents.find(team => team.id === parent.id)) {
    parents.push(parent)
    parents.push(...getParentTeams(parent.id, all_teams))
  }

  return parents
}
  

function reshapeTeamData(teams) {

  teams = teams
    .filter(team => (
      team.team_type === 'geographic' &&
      !team.name.includes('Expats')
    ))
    .map(team => {
      let name = team.name
        .replace(/\([^()]*\)/g, '') // remove everything in brackets
        .replace(/\s+/g, ' ') // remove double spaces
        .trim()

      if (name.toLowerCase().startsWith('volt ')) {
        name = name.slice(5)
      }

      return {
        ...team,
        name,
        parent_team_ids: getParentTeams(team.id, teams), // .map(team => team.id),
      }
    })
  
  teams = teams
    .map(team => {
      return {
        id: team.id,
        name: team.name,
        parent_team_ids: team.parent_team_ids
          .filter(parent_team => teams.find(team => team.id === parent_team.id))
          .map(parent_team => parent_team.id),
      }
    })

  const data = {
    // administrative_levels: teams
    //   .reduce((acc, team) => {
    //     if (!acc.hasOwnProperty(team.administrative_level)) {
    //       acc[team.administrative_level] = []
    //     }
    //     acc[team.administrative_level].push(team)
    //     // acc[team.administrative_level] += 1
    //     return acc
    //   }, {}),
    teams,
  }
  return data
}

app.get('/teams.json', function (req, res, next) {

  // todo reload the file every day once

  // check if cache file exists
  const cache_file_path = cache_folder_path + '/teams.json'
  if (fs.existsSync(cache_file_path)) {
    // return cached file
    fs.readFile(cache_file_path, 'utf8', function (err, teams) {
      if (err) {
        console.error(err)
        res.sendStatus(500)
      } else {
        const data = reshapeTeamData(JSON.parse(teams))
        res.json(data)
      }
    })
  } else {

    // get teams from volt.team api

    const url = `https://volt.team/api/v1/teams/${volt_team_root_team_id}/subteams?recursive=true`

    // fetch from the above url
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.volt_team_api_key}`
      }
    }).then(response => {
      if (response.status !== 200) {
        res.sendStatus(500)
      } else {
        response.json()
          .then(teams => {
            teams = [
              {
                id: 1 * volt_team_root_team_id,
                name: volt_team_root_team_name,
                country: '',
                team_type: 'geographic',
                administrative_level: 'europe',
              },
              ...teams
            ]

            const data = reshapeTeamData(teams)
            res.json(data)

            // save the data in a cache folder
            fs.writeFile(cache_file_path, JSON.stringify(teams), function (err) {
              if (err) {
                console.error(err)
              }
            })
          })
      }
    }).catch(error => {
      console.error(error)
      res.sendStatus(500)
    })
  }
})

app.get('/', function (req, res, next) {
  showClient(res) // show index.html
})

app.use(express.static(static_files_path))

app.get('*', function (req, res, next) {
  showClient(res) // show index.html as a fallback
})

const port = 4007
const host = '0.0.0.0' // Uberspace wants 0.0.0.0
http.createServer(app).listen({ port, host }, () =>
  console.info(`
    🚀 Server ready
    For uberspace: http://${host}:${port}/
    For local development: http://localhost:${port}/
  `)
)

