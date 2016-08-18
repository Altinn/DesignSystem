/* Her skrives kommentarer til UI-komponentene. */
var comments = {
"comments" : [
/*	{
		"el": ".a-options",
	 	"title" : "Avkrysningsbokser",
	 	"comment": ""
	},
	{
		"el": ".a-switch-label",
	 	"title" : "Avkrysningsknapper",
	 	"comment": ""
	},
	{
		"el": "#a-radioButtons",
	 	"title" : "Radioknapper",
	 	"comment": ""
	},
	{
		"el": "input[type=email]",
	 	"title" : "Input-felt: Epost",
	 	"comment": ""
	},
	{
		"el": ".input-group.disabled input[type=email]",
	 	"title" : "Deaktivert input-felt",
	 	"comment": ""
	},
	{
		"el": "#inputPersonalNumber",
	 	"title" : "Input-felt: Fødselsnummer",
	 	"comment": ""
	},
	{
		"el": "#inputText",
	 	"title" : "Input-felt: Tekst",
	 	"comment": ""
	},
	{
		"el": "#inputTel",
	 	"title" : "Input-felt: Telefonnummer",
	 	"comment": ""
	},
	{
		"el": "#inputFind",
	 	"title" : "Input-felt: Finn ...",
	 	"comment": ""
	},
	{
		"el": "input[type=search]",
	 	"title" : "Search",
	 	"comment": ""
	},
	{
		"el": "#dropdownMenu",
	 	"title" : "Nedtrekksmeny",
	 	"comment": ""
	},
	{
		"el": "#dropdownMenuDefault",
	 	"title" : "Standard nedtrekksmeny (selects)",
	 	"comment": ""
	},
	{
		"el": "#link",
	 	"title" : "Lenke i løpende tekst",
	 	"comment": ""
	},
	{
		"el": ".a-link-helpfunction",
	 	"title" : "Hjelpelenke i løpende tekst",
	 	"comment": ""
	},
	{
		"el": "#linkStandalone",
	 	"title" : "Lenke som står alene",
	 	"comment": ""
	},
	{
		"el": "#buttonLinkStandalone",
	 	"title" : "Knapp stylet som lenke",
	 	"comment": ""
	},
	{
		"el": "#linkStandaloneDanger",
	 	"title" : "Lenke som står alene og antyder fare",
	 	"comment": ""
	},
	{
		"el": "#buttonLinkStandaloneDanger",
	 	"title" : "Knapp som står alene og antyder fare",
	 	"comment": ""
	},
	{
		"el": "#buttonBorder",
	 	"title" : "Stor knapp",
	 	"comment": ""
	},
	{
		"el": "#linkButtonBorder",
	 	"title" : "Lenke stylet som stor knapp",
		 	"comment": ""
	},
	{
		"el": "#button",
	 	"title" : "Standard knapp",
	 	"comment": ""
	},
	{
		"el": "#linkButton",
	 	"title" : "Lenke stylet som knapp",
		 	"comment": ""
	},
	{
		"el": "#buttonDisabled",
	 	"title" : "Deaktivert knapp",
	 	"comment": ""
	},
	{
		"el": "#linkButtonDisabled",
	 	"title" : "Lenke stylet som en deaktivert knapp",
	 	"comment": ""
	},
	{
		"el": "#buttonSuccess",
		"title" : "Knapp som oppforder til å trykke",
		"comment": ""
	},
	{
		"el": "#linkButtonSuccess",
		"title" : "Knapp som oppforder til å trykke",
		"comment": ""
	},
	{
		"el": "#buttonDanger",
		"title" : "Knapp som oppforder brukeren til å tenke seg om før man trykker",
		"comment": ""
	},
	{
		"el": "#linkButtonDanger",
		"title" : "Knapp som oppforder brukeren til å tenke seg om før man trykker",
		"comment": ""
	},
	{
		"el": "#buttonAdd",
		"title" : "Knapp for å legge til",
		"comment": ""
	},
	{
		"el": "#linkButtonAdd",
		"title" : "Knapp for å legge til",
		"comment": ""
	},
	{
		"el": "#buttonDownload",
		"title" : "Knapp for å laste ned",
		"comment": ""
	},
	{
		"el": "#linkButtonDownload",
		"title" : "Knapp for å laste ned",
		"comment": ""
	},
	{
		"el": "#buttonUpload",
		"title" : "Knapp for å laste opp",
		"comment": ""
	},
	{
		"el": "#linkButtonUpload",
		"title" : "Knapp for å laste opp",
		"comment": ""
	},
	{
		"el": ".panel.a-collapse",
		"title" : "Knapp som kan ekspandere mer informasjon",
		"comment": ""
	},
	{
		"el": ".a-collapseHeader",
		"title" : "Overskrift som kan ekspandere en liste",
		"comment": ""
	},
	{
		"el": ".a-boxAddBtn",
		"title" : "Stor knapp for å legge til",
		"comment": ""
	},
	{
		"el": ".a-boxBtn",
		"title" : "Stor knapp",
		"comment": ""
	},
	{
		"el": "#linkWithPopover",
	 	"title" : "Lenker som har popover",
	 	"comment": ""
	},
	{
		"el": "#linkWithTooltip",
	 	"title" : "Lenker som har tooltip",
	 	"comment": ""
	},
	{
		"el": ".a-itemList",
	 	"title" : "Liste",
	 	"comment": ""
	},
	{
		"el": ".a-tableList",
	 	"title" : "Tabell-liste",
	 	"comment": ""
	},
	{
		"el": ".a-table",
	 	"title" : "Vanlig tabell",
	 	"comment": ""
	},
	{
		"el": ".a-logo",
	 	"title" : "Logo",
	 	"comment": ""
	},
	{
		"el" : "#loading",
	 	"title" : "Ikon for loading",
	 	"comment" : ""
	},
	{
		"el": "#leadText",
	 	"title" : "Intro/Ingress",
	 	"comment": ""
	},
	{
		"el": "#paragraph",
	 	"title" : "Avsnitt",
	 	"comment": ""
	},
	{
		"el": ".a-hrDotted",
	 	"title" : "Linjer",
	 	"comment": ""
	},
	{
		"el": "#label",
	 	"title" : "Labels",
	 	"comment": ""
	},
	{
		"el": ".a-tel",
	 	"title" : "Telefonnummer til kundestøtte",
		 	"comment": "<p><a href=\"http://bradfrostweb.com/blog/mobile/a-tel-tale-sign/\">Mobiltelefoner kan utføre telefonoppringinger</a>. Telefonnummer skal derfor være klikkbare, for å spare brukeren for å måtte kopiere og lime inn nummeret. Hva skjer når desktop-brukere klikker på nummeret? Noen enheter (iPad'er ++) spør brukeren om de vil legge nummeret i kontaktlisten sin, andre åpner programmer som Skype, eller liknende.</p>"
	},
	{
		"el": ".a-personRole",
		"title" : "Personrolle",
		"comment": ""
	},
	{
		"el": "#colnav",
		"title" : "Kolonnenavigasjon",
		"comment": ""
	},
	{
		"el": "#accordion",
		"title" : "Trekkspill",
		"comment": ""
	},
	{
		"el": "#tabs",
		"title" : "Faner",
		"comment": ""
	},
	{
		"el": "#pagination",
		"title" : "Paginering",
		"comment": ""
	},
	{
		"el": "#largeImage",
		"title" : "Stort bilde med bildetekst",
		"comment": "NB: Venter på design for bildetekst. NB2: Venter på avklaring rundt responsive bilder."
	},
	{
		"el": "#btnGroup",
		"title" : "Gruppe med knapper",
		"comment": ""
	},
	{
		"el": "#alert",
		"title" : "Varsel",
		"comment": ""
	},
	{
		"el": "#boxList",
		"title" : "Liste av store knapper",
		"comment": "Atomet 'box-button' satt sammen til en liste/gruppe av flere knapper. Brukes for utlisting av f.eks flere personroller som kan redigeres. "
	},
	{
		"el": "#modalExample",
		"title" : "Modalvindu",
		"comment": ""
	},
	{
		"el": "header[role=banner]",
	 	"title" : "Global topp",
	 	"comment": ""
	},
	{
		"el": "footer",
	 	"title" : "Footer",
	 	"comment": ""
	},
	{
		"el": "#articleBody",
		"title" : "Artikkel",
		"comment": ""
	}*/
]
};
