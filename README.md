# Table of Content
- [Table of Content](#table-of-content)
- [MultiOutputPlayer](#multioutputplayer)
  - [To Start](#to-start)
  - [To Development](#to-development)
  - [To Build Production](#to-build-production)
# MultiOutputPlayer

This is an Media Player with multiple audio outputs

Things you will use:
* [Node.js](https://nodejs.org)
* [NW.js](https://nwjs.io)
* [Bulma](https://bulma.io/documentation)
* [TypeScript](https://www.typescriptlang.org)
* [JQuery](https://jquery.com/)
* [Gulp](https://gulpjs.com/)


## To Start
You need previously had install Node.
``` 
// In the root folder
npm install
// In the src folder
npm install
```
## To Development
Follow the order
```
// In the src folder run
gulp
// In the root folder
npm run dev
```
## To Build Production
Follow the order
```
// In the src folder run
gulp prod
// In the root folder
npm run prod
```
if you want to add or remove any build platform edit the package.json in the root folder.
``` JSON
"scripts": {
    "prod": "nwbuild --platforms win32,win64,osx64,linux32,linux64 --buildDir dist/ src/dist/"
  }
```

