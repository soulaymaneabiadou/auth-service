# Auth Micro-Service

### About:

This is an authentification micro-service API built using
`nodejs` `express` and `graphql`.

It provides the following

#### Queries:

```javascript
login(user:{ email: String, password: String! }): {success: Boolean, token: String}!
getMe: User!  // This is a protected route
```

#### Mutations:

```javascript
register(user:{ name: String, email: String, password: String! }): {success: Boolean, token: String}!
```

### Tests

- Register

  - [x] One or more values not provided
  - [x] Invalid email format
  - [x] Duplicate email value
  - [x] Invalid Password(Less than 6 characters)

- Login

  - [x] Email or password not provided
  - [x] Invalid Credentials

- GetMe

  - [x] Auth header not provided(i.e. Not Logged In)

### Errors

- DB Errors

  - [x] Casting: Shound be `404` but gets it
  - [x] Duplicate: Shound be `400` and gets it
  - [x] Validation: Shound be `400` and gets it

- Auth Errors

  - [ ] Fields required: Shound be `400` but gets `500`
  - [x] Invalid Field: Shound be `400` and gets it
  - [x] Duplicate Field: Shound be `400` and gets it
  - [ ] Invalid Credentials: Shound be `400` but gets `500`
  - [ ] Not Authorized: Shound be `401` but gets `500`

### Todos:

- Fix status codes for the responses
