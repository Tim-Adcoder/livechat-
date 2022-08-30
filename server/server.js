const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const path = require('path');
const {authMiddleware} = require('./utils/auth')

const {PubSub} = require('graphql-subscriptions')
const { createServer } = require('http')
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core")
const { makeExecutableSchema } =require('@graphql-tools/schema')
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws')


const {typeDefs, resolvers} = require('./schemas')
const db = require('./config/connection')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())


if(process.env.NODE_ENV == 'production'){
	app.use(express.static(path.join(__dirname, '../client/build')))
}

app.get('/*',(req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

const httpServer = createServer(app)

const wsServer = new WebSocketServer({
	server: httpServer,
	path: '/subscriptions'
})

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
	schema,
	csrfPrevention: true,
	cache: "bounded",
	plugins: [
		ApolloServerPluginLandingPageLocalDefault({ embed: true }),
		{
			async serverWillStart() {
			  return {
				async drainServer() {
				  await serverCleanup.dispose();
				},
			  };
			},
		  }
	],
	context: authMiddleware
})



const serverCleanup = useServer({schema}, wsServer)




const startApolloServer = async (typeDefs, resolvers) =>{
	await server.start()
	server.applyMiddleware({app})
	db.once('open', ()=>{
		httpServer.listen(PORT, () =>{
			console.log(`API server running on port ${PORT}`)
			console.log(`Graphql server running at http://localhost:${PORT}${server.graphqlPath}`)
		})
	})
}

startApolloServer(typeDefs, resolvers)