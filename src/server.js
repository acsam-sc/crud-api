import 'dotenv/config'
import http from 'http'
import { v4 as uuidv4, validate as uuidValidate } from 'uuid'

const port = process.env.PORT || 3001
let users = []
const responseWithJSON = (res, statusCode, json) => {
	res.statusCode = statusCode
	res.setHeader("Content-Type", "application/json")
	res.write(JSON.stringify(json))
	res.end()
}
const responseWithError = (res, errorCode, errorMessage) => {
	res.statusCode = errorCode
	res.setHeader("Content-Type", "text/html")
	res.write(errorMessage)
	res.end()
}

const server = http.createServer((req, res) => {
	if (req.url === '/api/users') {
		if (req.method === "GET") {
			responseWithJSON(res, 200, users)
			} else if (req.method === "POST") {
				let reqBody = ''
				req.on('data', chunk => {
					reqBody += chunk.toString()
				})
				req.on('end', () => {
					const { username, age, hobbies } = JSON.parse(reqBody)
					if ( 
							(username && typeof username === 'string') && 
							(age && typeof age === 'number') &&
							(hobbies && Array.isArray(hobbies) )
						) {
						const newUser = { "id": uuidv4(), username, age, hobbies }
						users.push(newUser)
						responseWithJSON(res, 201, newUser)
					} else {
						responseWithError(res, 400, "Request must contain username(string), age(number) and hobbies(array of strings)")
					}
			})
		} else {
			responseWithError(res, 404, "The requested resourse doesn't exist")
		}
	} else if (req.url.startsWith('/api/users/')) {
		const userId = req.url.slice(11)
		if (!uuidValidate(userId)) {
			responseWithError(res, 400, "User ID is not correct uuid")
		} else if (users.filter(it => it.id === userId).length === 0) {
			console.log()
			responseWithError(res, 404, "User doesn't exist")
		} else if (req.method === "GET")	{
			const response = users.filter(it => it.id === userId)
			responseWithJSON(res, 200, response[0])
		} else if (req.method === "PUT") {
		let reqBody = ''
		req.on('data', chunk => {
			reqBody += chunk.toString()
		})
		req.on('end', () => {
			const { username, age, hobbies } = JSON.parse(reqBody)
			if ( 
					(username && typeof username === 'string') && 
					(age && typeof age === 'number') &&
					(hobbies && Array.isArray(hobbies) )
				) {
				const changedUser = users.filter(it => it.id === userId).map(it => { 
					return {...it, username, age, hobbies }
				})
				users = users.map(it => it.id === userId ? changedUser[0] : it)
				responseWithJSON(res, 200, changedUser[0])
			} else {
				responseWithError(res, 400, "Request must contain username(string), age(number) and hobbies(array of strings)")
			}
    })
	} else {
				responseWithError(res, 404, "The requested resourse doesn't exist")
		}
	}
})

server.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})