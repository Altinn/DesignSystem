# Om Altinn designsystem

Designsystemet er bygget med Pattern Lab. Dette repoet inneholder kildekoden, Pattern Lab-konfigurasjon og Gulp-konfigurasjon for å kjøre koden lokalt, samt for å bygge distribusjonsfiler.

## Installere avhengigheter

Naviger til kodebasens plassering på disk og kjør følgende kommando (krever at [Node.js](https://github.com/nodejs/node) og [npm](https://github.com/npm/npm) er installert):

```
npm install
```
Når denne kommandoen er kjørt vil du bli spurt om hvilke ekstra filtyper du ønsker å få tabs for i Patternlab. Her skal du kun oppgi 'json'. Dette vil gi en tab som viser data fra json-filen for hvert enkelt pattern i tillegg til Mustache og HTML.

```
npm install pre-commit
```

Dersom denne kommandoen feiler med en feilmelding av typen `pre-commit: Failed to symlink the hook file in your .git/hooks folder` må symlink settes opp i et kommandovindu kjørt som administrator. I et kommandovindu med root eller administratorrettigheter, kjør fra rotmappen til repositoriet.
```
node ./node_modules/pre-commit/install.js
```

Dersom dette også feiler eller om du ikke har administratorrettigheter på maskinen du jobber på må hook-filen legges ut manuelt. Dette gjøres ved å kopiere filen `./node_modules/pre-commit/hook` til `./.git/hooks`, for så å rename denne til `pre-commit`.

Installer avhengigheter for styleguidekit-assets-altinn mappen (innebærer både NPM og Bower), samt gjør en Gulp for å bygge styleguidekit-filer:

```
cd styleguidekit-assets-altinn
npm install
bower install
gulp
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

end readme
```
