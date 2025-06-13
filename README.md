# JWT BACKED SERVER

## Description

### A Node.js application designed primarily for mocking the backend authentication server

### Features

- Hybrid JWT authentication (access token in the body and refresh token in the httpOnly cookie)
- The signup, login, logout functionality
- An access token refreshing
- User data transfer
- An in-memory token & user stores
- CORS

### Dependencies

- `Express`

## Installation & Execution

### Install

```bash
  git clone https://github.com/mirzaianov/jwt-backend-server.git
  cd jwt-backend-server
  npm install
```

### Run in the development mode

```bash
  npm run dev
```

Node.js will start the server on [http://localhost:4000/](http://localhost:4000/)

> [!CAUTION]
> You must change the client url settings in the `constants.js` file if you want to use a different client

> [!IMPORTANT]
> Users and tokens will be stored only in the server memory during the runtime

> [!NOTE]
> An access token lives for 15 minutes (and a refresh token for 30 days)

### Client side

Client is set on [http://localhost:3000/](http://localhost:3000/)

### Signup

The `/signup` endpoint allows you to create a new user account.
It expects a JSON request body with the following fields:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "1234567890"
}
```

If the user is successfully created, the server will respond with:

- Status `200 OK`
- an `httpOnly` cookie with a `refresh token`
- JSON object containing the following fields:

```json
{
  "message": "User signed up successfully"
}
```

### Login

The `/login` endpoint allows you to log in a user.
It expects a JSON request body with the following fields:

```json
{
  "email": "john.doe@example.com"
}
```

or

```json
{
  "phoneNumber": "1234567890"
}
```

If the user is successfully logged in, the server will respond with:

- Status `200 OK`
- an `httpOnly` cookie with a `refresh token`
- JSON object containing the following fields:

```json
{
  "message": "User logged in successfully"
}
```

### Logout

The `/logout` endpoint allows you to log out a user.

If the user is successfully logged out, the server will respond with:

- Status `200 OK`
- an empty `refresh token`
- JSON object containing the following fields:

```json
{
  "message": "Logged out successfully"
}
```

### Refresh

The `/refresh` endpoint allows you to refresh an access token.
It expects a valid `refresh token` in the `cookie` header.

If an access token is successfully refreshed, the server will respond with:

- Status `200 OK`
- an `httpOnly` cookie with a `refresh token`
- JSON object containing the following fields:

```json
{
  "accessToken": "<access token>"
}
```

### User

The `/user` endpoint allows you to get user data.
It expects a valid `access token` with Bearer in the `authorization` header:

```bash
  Authorization: Bearer <access token>
```

If the user is successfully logged in, the server will respond with:

- Status `200 OK`
- JSON object containing the list of signed up users:

```json
[
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "1234567890"
  },
  {
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "phoneNumber": "0987654321"
  }
]
```

## License

### MIT license

You can use the code, but I ask you do not copy this site without giving me credit
