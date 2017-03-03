---
state: indesignreview
version: 1
js: altinnModal.js
---

Modal-komponenten er laget som en utvidelse av Bootstrap modaler, og muliggjør navigering mellom sider i en modal.
Funksjonaliteten kan brukes enten direkte via metoder, eller ved bruk av data-attributter. Klassen a-modal-content-target brukes for spesifisere hvor innholdet i modalen skal settes inn når ajax-requests er ferdig.

For å åpne en modal og laste gitt innhold brukes følgende attributter på trigger-elementet:
`data-toggle="altinn-modal" data-action="load" data-url="/minTestSide" data-target="#minModal"`

data-action beskriver hvilken handlings som utføres, i dette tilfellet "load", data-url sier hvilken url som skal lastes som innhold og data-target er ID til modal-elementet.

Alternativt kan man kalle `loadModal('/minTestSide', '#minModal')` fra Javascript



For å gå til en ny side i en modal brukes følgende attributter:
`data-toggle="altinn-modal" data-action="next" data-url="/minTestSideTo" data-target="#minModal" data-is-error="true" data-is-success="true"`

Her brukes samme attributter som for "load", men det forutsettes at modalen allerede er åpnet med "load"

Denne metoden kan også kalles direkte: `nextModalPage('/minTestSideTo', '#minModal', bool, bool)` hvor de siste paremetrene er for å styre om styling for grønn side eller rød side skal vises

For å gå tilbake til en side som er lastet tidligere brukes action "back":
`data-toggle="altinn-modal" data-action="back" data-target="#minModal"`

Her kan man også spesifisere antall sider man ønsker å gå tilbake med attributtet data-pages (default er 1).
Hvis man navigerer forbi første side i stacken vil modalen lukkes.

Metode for bruk direkte i javascript:
`previousModalPage('#minModal') eller previousModalPage('#minModal', 1337)`



For å lukke en modal:
`data-toggle="altinn-modal" data-action="close" data-target="#minModal"`

Direkte i javascript:
`closeModal('#minModal')`
