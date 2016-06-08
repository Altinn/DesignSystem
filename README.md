# Om Altinn designsystem

Designsystemet er bygget med Pattern Lab. Dette repoet inneholder kildekoden, Pattern Lab-konfigurasjon og Gulp-konfigurasjon for å kjøre koden lokalt, samt for å bygge distribusjonsfiler.

## Oppsett

Følg disse stegene for å sette opp ditt utviklingsmiljø:

### Installere avhengigheter

Naviger til kodebasens plassering på disk og kjør følgende kommando (krever at [Node.js](https://github.com/nodejs/node) og [npm](https://github.com/npm/npm) er installert):

```
npm install
```

### Sette opp Pattern Lab

For å gjøre klar Pattern Lab-installasjonen, kjør følgende kommando:

```
gulp setup
```

## Bruk

For å bygge distribusjonsfiler og kjøre koden lokalt, kjør følgende kommando (vil serve filene på localhost:3000, og automatisk bygge på nytt ved endringer i kildekoden):

```
gulp serve
```
