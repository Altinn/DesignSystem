/* Her skrives kommentarer til UI-komponentene. */
var comments = {
"comments" : [
	{
		"el": ".a-options",
	 	"title" : "Avkrysningsbokser",
	 	"comment": "Brukes i tilfeller der brukeren kan velge flere verdier fra et lite sett med alternativer.<a class=\"asg-editcomment\" href=\"https://github.com/Altinn/DesignSystem/blob/master/source/_data/annotations.js\">Rediger kommentaren</a>"
	},
	{
		"el": ".a-switch-label",
	 	"title" : "Avkrysningsknapper",
	 	"comment": "Brukes i tilfeller der brukeren kan tildele rettigheter til andre personer."
	},
	{
		"el": "#a-radioButtons",
	 	"title" : "Radioknapper",
	 	"comment": "Brukes i tilfeller der brukeren kun kan velge en verdi blant flere tilgjengelige."
	},
	{
		"el": "input[type=email]",
	 	"title" : "Input-felt: Epost",
	 	"comment": "Brukes når epost skal fylles ut av brukeren. Feilmelding kommer etter utfyllingen er ferdig."
	},
	{
		"el": ".input-group.disabled input[type=email]",
	 	"title" : "Deaktivert input-felt",
	 	"comment": "I visse tilfeller kan inputfelt være deaktivert, f.eks dersom brukeren må fylle ut noe annet først for å aktivere feltet. I disse tilfellene brukes klassen 'disabled' for å deaktivere feltet med grå, stiplede linjer."
	},
	{
		"el": "#inputPersonalNumber",
	 	"title" : "Input-felt: Fødselsnummer",
	 	"comment": "Brukes når fødselsnummer skal fylles ut. Feimelding kommer umiddelbart dersom bruker forsøker å skrive noe annet en siffer."
	},
	{
		"el": "#inputText",
	 	"title" : "Input-felt: Tekst",
	 	"comment": "Tekstfelt brukes når vanlig tekst skal fylles inn, f.eks navn. Label settes foran input-område."
	},
	{
		"el": "#inputTel",
	 	"title" : "Input-felt: Telefonnummer",
	 	"comment": "Brukes når telefonnummer skal fylles inn. Feimelding kommer umiddelbart dersom bruker forsøker å skrive noe annet en siffer."
	},
	{
		"el": "#inputFind",
	 	"title" : "Input-felt: Finn ...",
	 	"comment": "Søk innenfor et område. Ikon til venstre beskriver hva man søker i. F.eks tjenester, datalister, etc."
	},
	{
		"el": "#dropdownMenu",
	 	"title" : "Nedtrekksmeny",
	 	"comment": "Brukes når brukeren skal velge et av flere alternativ. Denne varianten er stilsatt og vil se lik ut på alle enheter."
	},
	{
		"el": "#dropdownMenuDefault",
	 	"title" : "Standard nedtrekksmeny (selects)",
	 	"comment": "Brukes når brukeren skal velge et av flere alternativ. Denne varianten er standard, og vil se ulik ut basert på hvilket operativsystem brukeren benytter."
	},
	{
		"el": "#link",
	 	"title" : "Lenke i løpende tekst",
	 	"comment": "En vanlig lenke som benytter < a >...< /a > vil se slik ut. Denne skal brukes i løpende tekst."
	},
	{
		"el": ".a-link-helpfunction",
	 	"title" : "Hjelpelenke i løpende tekst",
	 	"comment": "Hjelpelenker skal alltid benytte dette ikonet foran teksten. Hele teksten trenger ikke være klikkbar."
	},
	{
		"el": "#linkStandalone",
	 	"title" : "Lenke som står alene",
	 	"comment": "Lenker som ikke står i løpende tekst, men er adskilte, skal se slik ut. Dersom lenken tar deg til en ny side skal pilen › benyttes i slutten av teksten. Dersom lenken åpner et modalvindu eller valg, skal det ikke være pil. "
	},
	{
		"el": "#buttonLinkStandalone",
	 	"title" : "Knapp stylet som lenke",
	 	"comment": "Samme utseende som #linkStandalone, bare at her er det 'button' som er stylet i stedet for < a > ."
	},
	{
		"el": "#linkStandaloneDanger",
	 	"title" : "Lenke som står alene og antyder fare",
	 	"comment": "Lenker som antyder fare skal ha rød linje under teksten."
	},
	{
		"el": "#buttonLinkStandaloneDanger",
	 	"title" : "Knapp som står alene og antyder fare",
	 	"comment": "Knapper som antyder fare skal ha rød linje under teksten."
	},
	{
		"el": "#button",
	 	"title" : "Standard knapp",
	 	"comment": "Brukes for handlinger, f.eks 'Lagre', 'Send', osv. Siden knappen er kun 36px høy, er det avsatt et område over og under, slik at touch target er 48px. Det skal være minimum 12px mellomrom mellom hver knapp/lenke."
	},
	{
		"el": "#linkButton",
	 	"title" : "Lenke stylet som knapp",
		 	"comment": "Samme utseende og formål som #button, bare at her er det <code>< a ></code> som er stylet i stedet for <code>< button ></code> ."
	},
	{
		"el": "#buttonDisabled",
	 	"title" : "Deaktivert knapp",
	 	"comment": "Brukes i tilfeller der knappen ikke er aktiv. F.eks før brukeren har fylt ut nødvendig info, etc."
	},
	{
		"el": "#linkButtonDisabled",
	 	"title" : "Lenke stylet som en deaktivert knapp",
	 	"comment": "Samme utseende og formål som #buttonDisabled, bare at her er det <code>< a ></code> som er stylet i stedet for <code>< button ></code> ."
	},
	{
		"el": "#buttonSuccess",
		"title" : "Knapp som oppforder til å trykke",
		"comment": "Grønn knapp brukes for å motivere brukeren til å trykke, eller antyde suksess."
	},
	{
		"el": "#linkButtonSuccess",
		"title" : "Knapp som oppforder til å trykke",
		"comment": "Samme utseende og formål som #buttonSuccess, bare at her er det <code>< a ></code> som er stylet i stedet for <code>< button ></code>."
	},
	{
		"el": "#buttonDanger",
		"title" : "Knapp som oppforder brukeren til å tenke seg om før man trykker",
		"comment": "Rød knapp brukes for å advare brukeren mot handlingen. F.eks: Slette, avbryte, etc."
	},
	{
		"el": "#linkButtonDanger",
		"title" : "Knapp som oppforder brukeren til å tenke seg om før man trykker",
		"comment": "Samme utseende og formål som #buttonDanger, bare at her er det <code>< a ></code> som er stylet i stedet for <code>< button ></code>."
	},
	{
		"el": "#buttonAdd",
		"title" : "Knapp for å legge til",
		"comment": "Brukes i tilfeller der brukeren kan legge til noe, f.eks: en en person, en rettighet, etc."
	},
	{
		"el": "#linkButtonAdd",
		"title" : "Knapp for å legge til",
		"comment": "Samme utseende og formål som #buttonAdd, bare at her er det <code>< a ></code> som er stylet i stedet for <code>< button ></code>."
	},
	{
		"el": "#buttonDownload",
		"title" : "Knapp for å laste ned",
		"comment": "Brukes i tilfeller der brukeren kan laste ned noe."
	},
	{
		"el": "#linkButtonDownload",
		"title" : "Knapp for å laste ned",
		"comment": "Samme utseende og formål som #buttonDownload, bare at her er det <code>< a ></code> som er stylet i stedet for <code>< button ></code>."
	},
	{
		"el": "#buttonUpload",
		"title" : "Knapp for å laste opp",
		"comment": "Brukes i tilfeller der brukeren kan laste opp noe."
	},
	{
		"el": "#linkButtonUpload",
		"title" : "Knapp for å laste opp",
		"comment": "Samme utseende og formål som #buttonUpload, bare at her er det <code>< a ></code> som er stylet i stedet for <code>< button ></code>."
	},
	{
		"el": ".panel.a-collapse",
		"title" : "Knapp som kan ekspandere mer informasjon",
		"comment": "Brukes i tilfeller der det er ønskelig å gi brukeren oversikt over det som finnes, for deretter å dykke ned i temaer, (ved å ekspandere mer informasjon)."
	},
	{
		"el": ".a-collapseHeader",
		"title" : "Overskrift som kan ekspandere en liste",
		"comment": "Brukes i tilfeller der det er skal være mulig å ekspandere en liste."
	},
	{
		"el": ".a-boxAddBtn",
		"title" : "Stor knapp for å legge til",
		"comment": "Brukes i tilfeller der brukeren kan legge til noe, f.eks: en en person, virksomhet, etc."
	},
	{
		"el": ".a-boxBtn",
		"title" : "Stor knapp",
		"comment": "Stor knapp stylet som en boks med tittel, ikon og lenketekst/handling."
	},
	{
		"el": "#linkWithPopover",
	 	"title" : "Lenker som har popover",
	 	"comment": "Brukes når tips skal gis brukeren idet han trykker. Popover har tre fargevarianter. Gul er standard informasjon, grønn brukes for å bekrefte/oppfordre til handling, rød brukes for å advare."
	},
	{
		"el": "#linkWithTooltip",
	 	"title" : "Lenker som har tooltip",
	 	"comment": "Brukes når tips skal gis brukeren før han trykker (ved mouseover). Tooltip har tre fargevarianter. Gul er standard informasjon, grønn brukes for å bekrefte/oppfordre til handling, rød brukes for å advare."
	},
	{
		"el": ".a-itemList",
	 	"title" : "Liste",
	 	"comment": "Brukes for å liste ut enkel informasjon uten tilhørende handlinger, f.eks ulike rettigheter, roller, etc."
	},
	{
		"el": ".a-tableList",
	 	"title" : "Tabell-liste",
	 	"comment": "Brukes for å liste ut punkter som har tilhørende handlinger. Et punkt i listen kan være nylig lagt til, nylig fjernet, være mulig å legge til, fjerne eller redigere, eller ha andre tilhørende handlinger. "
	},
	{
		"el": ".a-table",
	 	"title" : "Vanlig tabell",
	 	"comment": "Brukes for vise en oversiktlig presentasjon av fakta som kan uttrykkes i tall eller tekst. NB: Dersom tabellen har mer enn 3-4 kolonner vil en horisontal scroll aktiveres inni tabellen."
	},
	{
		"el": ".a-logo",
	 	"title" : "Logo",
	 	"comment": "Logoen er en SVG-fil, som sikrer at den vil vise skarpt uansett skjermoppløsning og eventuell innzooming. En PNG fallback benyttes for nettleseres som ikke støtter SVG. Les mer på: <a href=\"http://bradfrostweb.com/blog/mobile/hi-res-optimization/\">Brad Frost sin blogg.</a></p>"
	},
	{
		"el" : "#loading",
	 	"title" : "Ikon for loading",
	 	"comment" : "Venter på design"
	},
	{
		"el": "#leadText",
	 	"title" : "Intro/Ingress",
	 	"comment": "Brukes som første avsnitt i artikler."
	},
	{
		"el": "#paragraph",
	 	"title" : "Avsnitt",
	 	"comment": "Vanlig avsnitt."
	},
	{
		"el": ".a-hrDotted",
	 	"title" : "Linjer",
	 	"comment": "Første variant er en enkel linje som kan benyttes som avbrekk i artikler. Andre linje er stylet med dotter, denne brukes for tydelig skille mellom innhold, f.eks i lister."
	},
	{
		"el": "#label",
	 	"title" : "Labels",
	 	"comment": "Brukes for å tiltrekke oppmerksomhet, belyse noe, fortelle at noe er nytt, fortelle antall, etc. F.eks antall uleste eposter. Todo: Lag regler for når de ulike bakgrunnsfargene skal benyttes..."
	},
	{
		"el": ".a-personRole",
		"title" : "Personrolle",
		"comment": "Brukes som overskrift for å vise hvilken person man redigererer rettigheter til."
	},
	{
		"el": "#colnav",
		"title" : "Kolonnenavigasjon",
		"comment": "NB: Ikke påbegynt enda. Skal brukes som oversikt for skjemaer, med temainndeling. "
	},
	{
		"el": "#accordion",
		"title" : "Trekkspill",
		"comment": "Atomet 'collapse-panel' satt sammen til en trekkspillmeny, der kun et panel kan være åpnet samtidig. Fungerer bra for mange temaer som skal presenteres, ettersom visningen er vertikal."
	},
	{
		"el": "#tabs",
		"title" : "Faner",
		"comment": "Et enkelt innholdsområdet med flere paneler, hvert panel er forbundet med en overskrift i en liste. Kun et panel er synlig om gangen. Fungerer best for 2-4 overskrifter/paneler, ettersom visninge er horisontal, og dermed har begrenset plass på små skjermer. "
	},
	{
		"el": "#pagination",
		"title" : "Paginering",
		"comment": "Brukes for å dele opp innholdet i adskilte sider man kan navigere mellom. Aktiv side skal alltid være markert."
	},
	{
		"el": "#largeImage",
		"title" : "Stort bilde med bildetekst",
		"comment": "NB: Venter på design for bildetekst. NB2: Venter på avklaring rundt responsive bilder."
	},
	{
		"el": "#btnGroup",
		"title" : "Gruppe med knapper",
		"comment": "Når flere knapper skal vises ved siden av hverandre, kan de legges i klassen <code>a-btn-group</code>. Dette gjelder f.eks i tilfeller der brukeren har flere valg/handlingsmuligheter."
	},
	{
		"el": "#btnGroup",
		"title" : "Gruppe med knapper",
		"comment": "Når flere knapper skal vises ved siden av hverandre, kan de legges i klassen <code>a-btn-group</code>. Dette gjelder f.eks i tilfeller der brukeren har flere valg/handlingsmuligheter."
	},
	{
		"el": "#alert",
		"title" : "Varsel",
		"comment": "Brukes for å varsle brukeren om noe. Et varsel hører som regel sammen med en annen komponent. Varselene kan for eksempel høre sammen med input-felt, der brukeren får en feilmelding dersom utfyllt informasjon ikke er korrekt."
	},
	{
		"el": "#boxList",
		"title" : "Liste av store knapper",
		"comment": "Atomet 'box-button' satt sammen til en liste/gruppe av flere knapper. Brukes for utlisting av f.eks flere personroller som kan redigeres. "
	},
	{
		"el": "#modalExample",
		"title" : "Modalvindu",
		"comment": "Brukes i tilfeller der brukeren skal gjennom en prosess for å utføre endringer innefor et område. Modalvinduet kan bestå av flere steg. Når prosessen er fullført vises grønn bakgrunn i modalvinduet. Dersom prosessen mislykkes, vises rød bakgrunn i modalvinduet. Modalvinduet kan også brukes for å vise mer informasjon om et tema."
	},
	{
		"el": "#articleBody",
		"title" : "Artikkel",
		"comment": "Sammensatt av tittel, ingress, pupliseringsinfo, og wysiwyg-editor."
	},







	{
		"el": "header[role=banner]",
	 	"title" : "Masthead",
	 	"comment": "The main header of the site doesn't take up too much screen real estate in order to keep the focus on the core content."
	},
	{
		"el": ".logo",
	 	"title" : "Logo",
	 	"comment": "The logo image is an SVG file, which ensures that the logo displays crisply even on high resolution displays. A PNG fallback is provided for browsers that don't support SVG images.</p><p>Further reading: <a href=\"http://bradfrostweb.com/blog/mobile/hi-res-optimization/\">Optimizing Web Experiences for High Resolution Screens</a></p>"
	},

	{
		"el": ".a-btn-group",
	 	"title" : "Touchable target heigh",
	 	"comment": "To ensure balanced information density and usability, touch targets should be at least 48 x 48 px. In most cases, there should be 8px or more space between them."
	},
	{
	 	"el": "#nav",
	 	"title" : "Navigation",
	 	"comment": "<p>Navigation for adaptive web experiences can be tricky. Top navigations are typical on desktop sites, but mobile screen sizes don't give us the luxury of space. We're dealing with this situation by creating a simple menu anchor that toggles the main navigation on small screens. This is just one method. <a href=\"http://bagcheck.com/\">Bagcheck</a> and <a href=\"http://contentsmagazine.com/\">Contents Magazine</a> add an anchor in the header that jumps users to the navigation which is placed in the footer. This solution works well because it doesn't require any Javascript in order to work. Other methods exist too. For example, <a href=\"http://m.espn.com\">ESPN's mobile navigation</a> overlays the main content of the page.</p><p>The nav is only hidden when a certain level of javascript is supported in order to ensure that users with little/poor javascript support can still access the navigation. Once the screen size is large enough to accommodate the nav, we show the main navigation links and hide the menu anchor.<p><p>See also: <a href=\"http://bradfrostweb.com/blog/web/responsive-nav-patterns/\">Responsive Navigation Patterns</a></p>"
	},
	{
		"el": "input[type=search]",
	 	"title" : "Search",
	 	"comment": "<p>Search is an incredibly important priority, especially for mobile. It is a great idea to give users the ability to jump directly to what they are looking for without forcing them to wade through your site's navigation. Check out the <a href=\"http://burton.com\">Burton</a> and <a href=\"http://yelp.com\">Yelp</a> mobile sites for great examples of experiences that prioritize search.</p><p>We're also using the <a href=\"http://dev.w3.org/html5/markup/input.search.html\">HTML5 search input type</a>, which is great for mobile devices that can <a href=\"http://diveintohtml5.info/forms.html\">bring up the appropriate virtual keyboard</a> for many smartphones. And like the main header navigation, we're hiding the search form on small screens to save space. Clicking the search anchor toggles the form. </p>"
	},
	{
		"el": "#product-img nav",
	 	"title" : "Image Navigation",
	 	"comment": "<p>Instead of providing bullets, pagination or text-based image navigation, it's good e-commerce practice to show a preview of the various product views. By default the images simply link through to their larger counterparts, and if adequate javascript support exists, the images get loaded into the main image container.</p>"
	},
	{
		"el": "#img-container",
	 	"title" : "Product Image",
	 	"comment": "<p>The product image is the focal point of the page for good reason. It's typically what the user is there to see. The default markup simply includes the main product image, but that gets replaced with an image gallery if adequate javascript support exists.</p><p>We're also using <a href=\"http://www.modernizr.com/\">Modernizr</a> to detect if the browser supports <a href=\"https://developer.mozilla.org/en/DOM/Touch_events\">touch events</a> and if it does, we load in an excellent lightweight script called <a href=\"http://swipejs.com/\">Swipe.js</a> to create a touch-friendly image carousel. This allows users to swipe between product photos in a touch-friendly way. Because gestures are invisible, they might get overlooked, but clicking on the image navigation thumbnails animates the  slideshow and hints to the user gestural interaction is available.</p>"
	},
	{
		"el": ".product-main header",
	 	"title" : "Product Overview",
	 	"comment": "The product overview appears in the markup before the image container in order to provide the user with the product name, how much it costs and how popular it is. Providing this information as soon as possible can help the user determine whether or not this is the product they're looking for without having to wait for the rest of the page to load."
	},
	{
		"el": ".qty-field",
	 	"title" : "Quantity Field",
	 	"comment": "We're using the HTML5 number input type, which <a href=\"http://diveintohtml5.info/forms.html\">brings up the appropriate virtual keyboard</a> for many mobile browsers. To increase usability, the input labels are using the \"for\" attribute, which focuses the cursor in the form field when clicked. However, iOS doesn't honor \"for\" default functionality, so we're adding \"cursor: pointer\" to the labels to get Mobile Safari to behave properly."
	},
	{
		"el": ".size-field",
	 	"title" : "Size Dropdown",
	 	"comment": "We're using a basic select menu to choose the size, which is commonplace for any e-commerce site. Select menus can be especially difficult to style and can vary greatly in behavior between platforms. Keep this in mind when creating "
	},
	{
		"el": ".submit-form",
	 	"title" : "Add to Cart button",
	 	"comment": "The add to cart button is the primary user action on the page. That's why it's large and in charge and very prominently placed on the page. The button is using box-shadows and rounded corners to create an attractive button that will hopefully get plenty of clicks."
	},
	{
		"el": ".share-btn",
	 	"title" : "Share button",
	 	"comment": "It seems like everything has a share button on it these days. And for good reason. Sharing content and products on social networks can be a great way to increase exposure. However, tacking on tons of social widgets adds a lot of overhead, which can be extremely <a href=\"http://www.strangeloopnetworks.com/web-performance-optimization-hub/topics/third-party-content/\">detrimental to the site's performance</a>. Including a simple share link that loads the heavy widgets only when requested is one way to keep pages fast and social. Check out <a href=\"http://target.com\">Target's mobile site</a> for an example of a site that isolates share functionality in a separate page fragment."
	},
	{
		"el": ".find-nearby",
	 	"title" : "Geolocation",
	 	"comment": "One of the most important aspects of the mobile context is location. We carry our mobile devices with us everywhere. Using <a href=\"http://dev.w3.org/geo/api/spec-source.html\">geolocation</a> we can tap into the user's location to deliver an enhanced experience. In this case we're giving them a chance to check out what stores nearby might sell this product. The geolocation API is well supported in mobile browsers as well as desktop browsers. We're using <a href=\"http://modernizr.com\">Modernizr</a> to detect for geolocation support and if its support, we ask the user for their latitude and longitude. If the browser does not support geolocation, the default experience could take the user to a simple web form asking for a ZIP code. Check out <a href=\"http://m.tiffany.com\">Tiffany's mobile site</a> store locator for an example of geolocation in action."
	},
	{
		"el": "#p-desc",
	 	"title" : "Product Description",
	 	"comment": "A product description is an essential part of any e-commerce experience. Descriptions offer tangible details that inform and persuade, and the tone can help support the physical product. Provide relevant information clearly and concisely. Check out the <a href=\"http://developer.android.com/design/style/writing.html\">Android design guide</a> for some tips on how to keep copy short and extremely effective."
	},
	{
		"el": "#related-products",
	 	"title" : "Related Products",
	 	"comment": "<p>Related products are obviously an important aspect of e-commerce sites as they drive awareness of other similar products and can lead to more purchases. However, including a lot of auxiliary content can bog down the site performance, which is especially crucial on mobile. On slow connections, the presence of this extra content might slow down the user experience enough that the user gives up.</p><p>We're handling the issue by <a href=\"http://24ways.org/2011/conditional-loading-for-responsive-designs\">conditionally loading</a> the auxiliary content.</p><p>By default, the related item link simply clicks through to an HTML fragment containing the related products. The content is still accessible, even on devices with poor or no javascript support. When the user clicks on the related products on small screens, the content gets dynamically loaded inline and the link becomes a toggler for the content. Once the experience reaches a certain width breakpoint, we then load in the content. However, screen size != fast connection, so we should keep our eyes on the emerging <a href=\"http://davidbcalhoun.com/2010/using-navigator-connection-android\">navigator.connection</a> to better gauge real connection speed.</p><p>See also: <a href=\"http://filamentgroup.com/lab/ajax_includes_modular_content/\">An Ajax-Include Pattern for Modular Content</a></p><p>All these wonderful t-shirts are retired/rejected <a href=\"http://bustedtees.com\">Busted Tees</a>, graciously donated to this demo by <a href=\"http://www.willschneidblog.com/\">Will Schneider</a>.</p>"
	},
	{
		"el": "#reviews",
	 	"title" : "Reviews",
	 	"comment": "Reviews are incredibly influential on a user's decision to purchase a product or pass on it. Also, because we carry our mobile phones with us everywhere, we use them to inform our in-store purchased. <a href=\"http://googlemobileads.blogspot.com/2011/04/smartphone-user-study-shows-mobile.html\">70% of smartphone owners use them while in brick and mortar stores</a>, and often times they're looking for reviews to give them the green light to buy.</p><p>Only the primary product content gets loaded by default, and the reviews exist as their own separate HTML fragment. The reviews remain accessible and don't get loaded until we <a href=\"http://24ways.org/2011/conditional-loading-for-responsive-designs\">conditionally load</a> them when the screen is large enough or small screen users click the reviews link.  This keeps things nimble while still providing access to the valuable reviews.</p><p>See also: <a href=\"http://filamentgroup.com/lab/ajax_includes_modular_content/\">An Ajax-Include Pattern for Modular Content</a></p>"
	},
	{
		"el": "#p-reviews .btn",
	 	"title" : "More Reviews Button",
	 	"comment": "<p>All reviews aren't loaded by default in order to keep the site performance in top shape. Ultimately, this button could be replaced with a <a href=\"http://www.infinite-scroll.com/\">lazy-loading</a> solution to remove the need for the button.</p>"
	},
	{
		"el": ".footer .nav",
	 	"title" : "Footer Nav",
	 	"comment": "<p>Repetition of elements isn't a bad thing, especially with potentially long scrolling pages on mobile. Providing access to the main site navigation is a good way for the user to jump off to another section and avoids leaving them with a dead end. Also, some mobile sites like <a href=\"http://bagcheck.com/\">Bagcheck</a> and <a href=\"http://contentsmagazine.com/\">Contents Magazine</a> keep the primary navigation at the footer and simply link to it with an anchor in the header. That way the nav stays accessible but the focus stays on on the core page content.</p>"
	},
	{
		"el": ".tel",
	 	"title" : "Customer Service Number",
	 	"comment": "<p>We sometimes forget that <a href=\"http://bradfrostweb.com/blog/mobile/a-tel-tale-sign/\">mobile phones can make phone calls</a>. Whether a user is having trouble with the site or simply has some questions about the product he's about to buy, it's a smart decision to provide a clickable phone number to facilitate that call. What happens when desktops and other non-phone devices click on the <a href=\"http://www.mobilexweb.com/blog/click-to-call-links-mobile-browsers\">tel link</a>? Well, some devices (like iPads and other tablets) ask the user if they'd like to add the number to their contact list, other desktops open 3rd party VoIP programs like Skype, and others simply give an error message.</p>"
	},
	{
		"el": ".top",
	 	"title" : "Back to Top Link",
	 	"comment": "<p>Back to top links are simple yet underrated. They provide users with an easy way back up to the top of the page with minimum effort. This is especially helpful on mobile devices, which tend to have long scrolling pages.</p><p>We're using an HTML character for the back to top arrow in order to reduce image elements and keep things looking crisp on high res displays.</p>"
	}
]
};
