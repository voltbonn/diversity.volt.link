require('dotenv').config()

const isDevEnvironment = process.env.environment === 'dev' || false
const path = require('path')
const url = require('url')

const http = require('http')

const express = require('express')
const rateLimit = require('express-rate-limit')

const { fetch } = require('cross-fetch')
const { sendInitialStats } = require('./stats.js')

const fs = require('fs')
const ObjectId = require('mongodb').ObjectId // just to check ObjectIDs

const static_files_path = path.join(__dirname,
  isDevEnvironment
    ? '../volt.link-frontend/build/'
    : '../volt.link-frontend/'
)

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

const blockQuery = `
  _id
  type
  properties
  content {
    blockId
    block {
      _id
      type
      properties
      content {
        blockId
      }
      parent
      metadata {
        modified
        modified_by
      }
      permissions
      computed {
        roles
        inherited_block_permissions
        contentAsPlaintext
      }
    }
  }
  parent
  metadata {
    modified
    modified_by
  }
  permissions
  computed {
    roles
    inherited_block_permissions
    contentAsPlaintext
  }
`

async function getBlockBySlug(slug, headers = {}) {
  return new Promise(resolve => {
    fetch((
      isDevEnvironment
      ? 'http://0.0.0.0:4004/graphql/v1/'
      : 'https://api.volt.link/graphql/v1/'
    ), {
      method: 'POST',
      body: JSON.stringify({
        query: `query ($slug: String!) {
          block: blockBySlug (slug: $slug) {
      		  ${blockQuery}
          }
        }`,
        variables: {
          slug,
        }
      }),
      headers: {
        ...headers,
        'content-type': 'application/json',
      }
    })
    .then(async data => {
      data = await data.json()
      if (
        data
        && data.data
        && data.data.block
      ) {
        resolve(data.data.block)
      } else {
        resolve(null)
      }
    })
    .catch(error => {
      console.error(error)
      resolve(null)
    })
  })
}

async function getBlockById(id, headers = {}) {
  return new Promise(resolve => {
    fetch((
      isDevEnvironment
      ? 'http://0.0.0.0:4004/graphql/v1/'
      : 'https://api.volt.link/graphql/v1/'
    ), {
      method: 'POST',
      body: JSON.stringify({
        query: `query ($_id: ObjectID!) {
          block (_id: $_id) {
      		  ${blockQuery}
          }
        }`,
        variables: {
          _id: id,
        }
      }),
      headers: {
        ...headers,
        'content-type': 'application/json',
      }
    })
      .then(async data => {
        data = await data.json()
        if (
          data
          && data.data
          && data.data.block
        ) {
          resolve(data.data.block)
        } else {
          resolve(null)
        }
      })
      .catch(error => {
        console.error(error)
        resolve(null)
      })
  })
}

async function getBlocks(ids = [], slugs = [], headers = {}) {
  return new Promise(resolve => {

    ids = ids.filter(id => ObjectId.isValid(id))

    fetch((
      isDevEnvironment
        ? 'http://0.0.0.0:4004/graphql/v1/'
        : 'https://api.volt.link/graphql/v1/'
    ), {
      method: 'POST',
      body: JSON.stringify({
        query: `query ($ids: [ObjectID], $slugs: [String]) {
          blocks (ids: $ids, slugs: $slugs) {
      		  ${blockQuery}
          }
        }`,
        variables: {
          ids,
          slugs,
        }
      }),
      headers: {
        ...headers,
        'content-type': 'application/json',
      }
    })
      .then(async data => {
        data = await data.json()
        if (
          data
          && data.data
          && data.data.blocks
        ) {
          resolve(data.data.blocks)
        } else {
          resolve(null)
        }
      })
      .catch(error => {
        console.error(error)
        resolve(null)
      })
  })
}

async function getSlugInfos(slug, headers = {}) {
  return new Promise(resolve => {
    fetch((
      isDevEnvironment
        ? 'http://0.0.0.0:4004/graphql/v1/'
        : 'https://api.volt.link/graphql/v1/'
    ), {
      method: 'POST',
      body: JSON.stringify({
        query: `query checkSlug ($slug: String!) {
          checkSlug (slug: $slug) {
            existsAsSlug
            existsAsId
          }
        }`,
        variables: {
          slug: slug,
        }
      }),
      headers: {
        ...headers,
        'content-type': 'application/json',
      }
    })
      .then(async data => {
        data = await data.json()
        if (
          data
          && data.data
          && data.data.checkSlug
        ) {
          resolve({
            existsAsSlug: data.data.checkSlug.existsAsSlug || false,
            existsAsId: data.data.checkSlug.existsAsId || false,
          })
        } else {
          resolve({
            existsAsSlug: false,
            existsAsId: false,
          })
        }
      })
      .catch(error => {
        console.error('error for checkSlug:', error)
        resolve({
          existsAsSlug: false,
          existsAsId: false,
        })
      })
  })
}

async function getBlockBySlugOrId(slugOrId, headers = {}) {
  let block = await getBlockBySlug(slugOrId, headers)
  if (block) {
    return {
      block,
      used_query: 'slug',
    }
  } else {
    block = await getBlockById(slugOrId, headers)
    return {
      block,
      used_query: 'id',
    }
  }
}

function getImageUrl(imageObj) {
  if (
    typeof imageObj === 'object'
    && imageObj !== null
    && !Array.isArray(imageObj)
  ) {
    if (imageObj.type === 'url') {
      return imageObj.url || ''
    }
  }

  return ''
}

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

  // The client needs to check if the block exists OR if a error page should be shown.
  // AND the client should to correct the slug if it's wrong.
  // (TODO: There currently is no function to find the correct slug from an id.)
}

function normalizeSlug(slug) {
  if (typeof slug === 'string') {
    slug = slug
      .trim()
      .toLowerCase()
    // .replace(/_/g, '-')

    return slug
  }

  return null
}

let static_files_cache = null
async function getIsStaticFile(slug) {
  if (static_files_cache === null) {
    const filenames = fs.readdirSync(static_files_path, { withFileTypes: true })
      .map(({ name: filename }) => normalizeSlug(filename))

    const filetypes = fs.readdirSync(static_files_path, { withFileTypes: true })
      .reduce((filetypes, fileinfos) => {
        filetypes[fileinfos.name] = {
          isFile: fileinfos.isFile(),
        }
        return filetypes
      }, {})

    static_files_cache = {
      filenames,
      filetypes,
    }
  }
  
  if (static_files_cache !== null) {
    slug = normalizeSlug(slug)

    const isStaticFile = static_files_cache.filenames.includes(slug)

    let isFile = false
    if (static_files_cache.filetypes.hasOwnProperty(slug)) {
      isFile = static_files_cache.filetypes[slug].isFile
    }

    return {
      isStaticFile,
      isFile,
    }
  }
  
  return {
    isStaticFile: false,
    isFile: false,
  }
}

app.get('/', async function (req, res, next) {
  showClient(res) // call showClient to replace the default meta infos (__META_TITLE__, ...)
})

app.get(/^\/([^=/]*)(?:=?)([^=/]*)(.*)/, async function (req, res, next) {
  const headers = {
    cookie: req.headers.cookie, // for authentication
    'user-agent': req.headers['user-agent'], // for analytics
    referer: req.headers.referer, // for analytics
  }

  const group0 = req.params[0] // slug (or id if group1 is empty) // capture-group before separator
  const group1 = req.params[1] // id // capture-group after separator
  // const group2 = req.params[2] // suffix


  const {
    isStaticFile,
    isFile,
  } = await getIsStaticFile(group0)

  if (isStaticFile === true) {
    // captureGroupBeforeSeparator is a file. Not a slug or id.
    if (isFile === true) {
      res.sendFile(static_files_path + group0)
    } else {
      // Go to the next route.
      // The next route shows static files.
      next('route')
    }
  } else {
    let done = false

    if (done === false && !!group0 && !group1) {
      const blocks = await getBlocks([group0], [group0], headers)
      if (!!blocks && blocks.length > 0) {
        // This gets called for "/:slug"
        // group0 is a slug
        // redirect it accoringly

        const block = blocks[0]
        if (block.type === 'redirect') {
          let redirect_url = block.properties.url || ''

          if (typeof redirect_url === 'string' && redirect_url !== '') {
            done = true

            // log redirect
            try {
              const website = isDevEnvironment
                ? process.env.umami_id_dev
                : process.env.umami_id_prod
              const hostname = isDevEnvironment
                ? 'localhost'
                : 'volt.link'
              const url = req.originalUrl

              sendInitialStats({ website, url, hostname }, req.headers)
            } catch (error) {
              console.error('umami-error:', error)
            }

            // redirect
            res.redirect(redirect_url)
          }
        }

        if (done === false) {
          done = true
          showClient(res, blocks)
        }
      }
    }

    if (done === false && !!group1) {
      // This gets called for "/:slug=:id" 
      // check if group1 is ID by finding it in the database
      const block = await getBlockById(group1, headers)
      if (!!block && !!block._id) {
        if (done === false) {
          done = true
          showClient(res, [block])
        }
      }
    }

    if (
      done === false
      && typeof group0 === 'string' && group0 !== ''
    ) {
      // Error 403 and 404. These are checked in more detail on the client.
      done = true
      showClient(res)
    }

    if (done === false) {
      next('route')
    }
  }
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

