# vue-golang-todolist
A frontend Vue app built on top of [golang-todolist](https://github.com/jjmontgo/golang-todolist) for educational purposes.

## Installation

Create the file `.env.development.local` with the URL of your GoLang backend.
Presuming you run the backend first:

```
VUE_APP_BACKEND_URL=http://localhost:8080
```

Then add the file `.env.production.local` with the AWS API Gateway URL of your
GoLang Lambda backend.

```
VUE_APP_BACKEND_URL=
```

When developing, first start your GoLang backend, then run:

```
npm run serve
```

And when ready to go live, compile your files for production:

```
npm run build
```
