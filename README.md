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
  }
}
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