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
{
  users {
    id
    name
    email
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