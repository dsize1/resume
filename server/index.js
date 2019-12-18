const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const multer = require('multer')
const etag = require('etag')
const upload = multer({dest: path.join(__dirname, './avatars')})
const svgCaptcha = require('svg-captcha')

const port = 7088

const sessions = {

}

// setInterval(() => {
//   Object.entries(sessions).forEach(([key, {timestamp, text}]) => {
//     console.log(key, timestamp, text)
//     if (Date.now() - timestamp > 1000 * 60 * 5) {
//       delete sessions[key]
//     }
//   })
//   console.log(sessions)
// }, 1000 * 60 * 5);

const app = express()

//  cors
app.use(cors())

//  static resource
// const staticOptions = {
//   dotfiles: 'ignore',
//   etag: true,
//   extensions: ['htm', 'html', 'js', 'css'],
//   index: false,
//   redirect: false,
//   lastModified: true,
//   maxAge: 86400000,
//   setHeaders: function (res, path, stat) {
//     res.set('Cache-Control', 'must-revalidate, max-age=86400000')
//     res.set('ETag', etag(stat))
//   }
// }
// app.use(express.static(path.join(__dirname, 'build'), staticOptions))
// app.use('/avatars',express.static(path.join(__dirname, './avatars'), staticOptions))

//  cookie parser
app.use(cookieParser('woailijinyan'))
const cookieOptions = {
  signed: true,
  maxAge: 1000 * 60 * 60 * 72,
  httpOnly: false
}
// const sessionOptions = {
//   signed: true,
//   maxAge: 1000 * 60 * 5,
//   httpOnly: true
// }

//  body parser 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.use((req, res, next) => {
  console.log(req.method, req.url, req.body)
  next()
})

// app.use(function sessionMiddleware(req, res, next) {
//   if (!req.signedCookies.sessionId) {
//     res.cookie('sessionId', Math.random().toString(16).substr(2), sessionOptions)
//   }
//   next()
// })

// app.get(/^\/(?!api\/)\S*$/, async (req, res, next) => {
//   console.log(1)
//   res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })

const genResponse = (data, result = '01') => {
  let res = {}
  if (result == '02') {
    res.payload = null
    res.errMsg = 'error'
  } else {
    res.payload = data
    res.errMsg = ''
  }
  return JSON.stringify({
    ...res,
    result
  })
}

const random = () => Math.random() > 0.5

app.post('/api/test', (req, res, next) => {

  if (random()) {
    if (random()) {
      const data = req.body
      res.status(200).send(genResponse(data))
    } else {
      res.status(200).send(genResponse('error', '02'))
    }
  } else {
    res.status(400).end()
  }
  
})

// app.get('/api/captcha', (req, res, next) => {
//   let sessionId = req.signedCookies.sessionId
//   console.log(sessionId)
//   const captcha = svgCaptcha.create({
//     size: 4,
//     ignoreChars: '0o1i',
//     noise: 3,
//   })
//   sessions[sessionId] = {
//     text: captcha.text,
//     timestamp: Date.now()
//   }
//   res.type('svg')
//   res.status(200).send(captcha.data)
// })

// app.route('/api/authentication')
//   .post(async (req, res, next) => {
//     console.log(1)
//     const sessionId = req.signedCookies.sessionId
//     const {username, password, captcha} = req.body  
//     const query = {
//       username,
//       password
//     }      
//     const user = await User.login(query) 
//     if (user && sessionId && sessions[sessionId] && sessions[sessionId].text === captcha) {
//       const id = user._id.toString()
//       const { avatar } = user
//       res.cookie('userId', id, cookieOptions)
//       req._databaseResponse = {
//         data: {
//           id,
//           avatar,
//           username
//         },
//         errors: user.errors,
//         errorText: 'Internal server error, Login again please.' 
//       }
//       next()
//     } else {
//       res.status(403).send({ message: 'Captcha or password is not correct!' })
//     }
//   })

// app.get('/api/signout', (req, res, next) => {
//   res.clearCookie('sessionId')
//   res.clearCookie('userId')
//   req._databaseResponse = {
//     data: {
//       message: 'out'
//     },
//     errors: false,
//     errorText: ''
//   }
//   next()
// })

// app.route('/api/authentication/signup')
//   .post(upload.single('avatar'), async (req, res, next) => {
//     const sessionId = req.signedCookies.sessionId
//     const {username, password, captcha} = req.body
//     if (sessionId && sessions[sessionId] && sessions[sessionId].text === captcha) {
//       if (!username || !password) {
//         res.status(500).send({message: 'Internal server error! Signup again please .'})
//       } else {
//         const avatar = req.file ? req.file.filename : 'unknown'
//         const query = { username }
//         const hasUser = await User.hasUser(query)
//         if (hasUser) {
//           res.status(400).send({ message: 'Username has been used!' })
//         } else {
//           const user = await User.signup({ username, password, avatar })
//           const id = user._id.toString()
//           res.cookie('userId', id, cookieOptions)
//           req._databaseResponse = {
//             data: {
//               id,
//               avatar,
//               username
//             },
//             errors: user.errors,
//             errorText: 'Internal server error! Signup again please .'
//           }
//           next()
//         } 
//       }
//     } else {
//       req._databaseResponse = {
//         data: {},
//         errors: true,
//         errorText: 'Captcha fault, Login again please.'
//       }
//       next()
//     }
//   })

// app.route('/users/:userid')
//   .get(async (req, res, next) => {
    
//   })

app.listen(port, () => {
  console.log('server listening on port', port)
})