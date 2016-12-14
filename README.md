# Om Altinn designsystem

Designsystemet er bygget med Pattern Lab. Dette repoet inneholder kildekoden, Pattern Lab-konfigurasjon og Gulp-konfigurasjon for å kjøre koden lokalt, samt for å bygge distribusjonsfiler.

## Installere avhengigheter

Naviger til kodebasens plassering på disk og kjør følgende kommando (krever at [Node.js](https://github.com/nodejs/node) og [npm](https://github.com/npm/npm) er installert):

```
npm install
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
./node_modules/.bin/bower install
./node_modules/.bin/gulp


## Bruk
For å kjøre koden lokalt, bruk følgende kommando (vil serve filene over localhost, og automatisk bygge på nytt ved endringer i kildekoden):

cd ..
npm start