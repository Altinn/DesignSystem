---
state: indesignreview altinn
version: 1
js: expandContent.js
---

Eksempel på bruk av handlingsknapp sammen med en lenger seksjon som kan utvides av bruker ved klikk på knappen.
Bruker data-toggle="altinn-expand" og data-target="idPåElement" for å peke på innhold som skal kunne ekspanderes.
Ved sidelasting sjekkes høyden på elementet som har innholdet, og hvis høyden er høyere enn satt verdi legges det på gradient og knapp - hvis ikke vises det som det er og knappen skjules.

Obs: Hvis innholdet er skjult ved sidelasting må setupExpandContent kalles på nytt etter at innholdet er vist for at visningen skal bli riktig.
