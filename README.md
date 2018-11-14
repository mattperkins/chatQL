# INSTALL 
## yarn 

# RUN 
## npx supervisor .

# SERVER
## ENDPOINTS 
### localhost:3000/graphql

# DEPLOY 
## yarn build

## GRAPHQL

### Root Query
```
query {
  users {
    id
    name
    email
    messages {
      body
    }
  }
}
```

### mock graphql mechanics
```
curl -X POST -H "Content-Type: application/json" -d '{ "query" : "{ users { id email } }" }' localhost:3000/graphql -w "\n"
```

### getUser Query
```
query getUser($id: ID!){
  user(id: $id) {
    email
    name
  }
}
# QUERY VARIABLES (graphiql bottom GUI tray):
{ "id": "1" }
```

### All messages Query
```
query {
    messages {
      id
      body
      createdAt
	}
}
```



### Mutation
```
mutation {
    addUser(email: "bob@email.com") {
      id
      email
      name
    }
  }
```