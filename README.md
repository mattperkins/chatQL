# CHATQL : REAL-TIME 
## Built with MERNQL Stack

## MVP
* Sign up/Sign in/Password reset
* Direct messaging (1 to 1)
* Private Group messaging (2+)
* File sharing (images & text)
* Responsive material design

# INSTALL 
## yarn 

# RUN
## yarn watch

# SERVER/DEV
## ENDPOINTS 
### localhost:4000

# DEPLOY 
## yarn build

***************************************************

## GRAPHQL Schemas

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