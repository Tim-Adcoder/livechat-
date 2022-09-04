const {gql} = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID
		email: String
		password: String
		name: String
		contacts: [User]
	}

	type Message {
		_id: ID
		user: User!
		conversation: Conversation!
		text: String!
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		User(userId: ID!): User
		me: User
		messages(conversationId: ID!): [Message]
	}

	type Mutation {
		addUser(name: String!, email: String!, password: String!): Auth
		login(email: String!, password: String!): Auth
		addConversation(members: [String]!): Conversation
		addMessage(conversationId: ID!, text: String!): Conversation
		removeMessage(messageId: ID!): Conversation
		editMessage(messageId: ID!, text: String!): Conversation
		addContact(email: String!): User
		removeContact(userId: ID!): User
	}

	type Subscription {
		messages(conversationId: ID!): [Message]
		conversations(userId: ID!): [Conversation]
	}
`

module.exports = typeDefs