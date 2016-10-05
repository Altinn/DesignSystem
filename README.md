# Om Altinn designsystem

Designsystemet er bygget med Pattern Lab. Dette repoet inneholder kildekoden, Pattern Lab-konfigurasjon og Gulp-konfigurasjon for å kjøre koden lokalt, samt for å bygge distribusjonsfiler.

## Installere avhengigheter

Naviger til kodebasens plassering på disk og kjør følgende kommando (krever at [Node.js](https://github.com/nodejs/node) og [npm](https://github.com/npm/npm) er installert):

```
npm install
```

## Bruk

For å kjøre koden lokalt, bruk følgende kommando (vil serve filene over localhost, og automatisk bygge på nytt ved endringer i kildekoden):

```
gulp // npm start
```

For å bygge distribusjonsfiler, bruk følgende kommando:

```
gulp dist // npm run dist
```

For å bygge patterns og snippets:

```
npm run patterns
```
