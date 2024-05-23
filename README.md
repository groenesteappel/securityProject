# Threath analysis & DNS

De repo bestaat uit 2 grote delen:

- De threath analysis website gebaseerd op angular
- De DNS server gebasseerd op pihole

## Threath analysis

### Backend

De backend is een nodejs applicatie die runt op poort 3000, een node alpine container. De backend dient vooral om de rss feeds op te slagen die je via de webinterface (zie verder) kunt toevoegen. Ook voor de lijst met rss feed content te krijgen zal hiervan gepulled worden. De volgende routes zijn beschikbaar op /api/:

- feed (get): heeft een parameter url nodig en zal vervolgens alle rss articles weergeven voor het des betreffende rss url.
- addUrls (post): Deze api call zal een speciefieke urls toevoegen waar de feeds van gelezen worden.
- toggleFeedState (post): Deze call zal de url aan of afzetten waar de rss feed van getrokken wordt.
- removeUrl (delete): Verwijderd een rss feed url uit de lijst.
- listUrls (get): Geeft de volledige lijst van rss feeds weer.
- fetchAllFeeds (get): Geeft alle CVE-records weer van de rss feeds die in de lijst staan.
- savedsearches (get): Geeft de lijst van savedsearches terug.
- savedsearches (post): Voegt een savedsearch toe aan de database.
- savedsearches (delete): Verwijderd een savedsearch uit de database.

### angular-frontend

Dit is de angular (v17) applicatie die 3 web pagina's heeft:

- Feed: Een lijst met alle feeds die geactiveerd zijn, op deze pagina kan je ook zaken opzoeken in de rss feed. Je kan filteren op woorden, datums en de expliciete rss feed die je wilt gebruiken. Ook kan je zoekopdrachten opslaan zodat je ze niet elke keer handmatig hoeft in te geven.
- Feed dashboard: Hier kan je rss feeds toevoegen waarvan je wilt dat de articles op de feed pagina komen. Je kan ook rss feeds verwijderen of deze in of uitschakelen.
- Pi-hole dashoard: Een pagine met een beperkte weergaven van de DNS gegevens die door pi-hole gaan.

De angular frontend is bereikbaar via http://{your_ip}:4201.

### MongoDB

MongoDB is de database die gebruikt wordt om volgende zaken op te slaan:
- De savedsearches
- De lijst met urls naar rss feeds

De standaard credentials zijn (ze staan in de docker-compse.yml):

```
MONGO_INITDB_ROOT_USERNAME: rootuser
MONGO_INITDB_ROOT_PASSWORD: rootpassword
```

Deze credentials zijn best aan te passen naar een sterker wachtwoord. Let hierbij wel op om ook volgende lijn te veranderen in de backend ==> src ==> services ==> db.js:
```
await mongoose.connect('mongodb://rootuser:rootpassword@mongodb:27017/FeedDB?authSource=admin'
```
Vervang hierbij de rootuser door de gekozen username en rootpassword door het gekozen passwoord.

De database draait op poort 27017.

## DNS

Onze DNS is opgebouwd uit 2 onderdelen, de pi-hole en cloudflared. Uiteindelijk wordt de dns server van quad9 gebruikt.

### Pi-hole

De pi-hole dient vooral om eigen DNS records toe te voegen. Ook bestaat er de mogelijkheid om DNS records te blacklisten. Het standaard wachtwoord dat ingesteld is is "changeme", dit is best te veranderen in de Dockerfile in de pi-hole folder door deze lijn te veranderen:

```
ENV WEBPASSWORD=changeme
```

De pi-hole draait op een ubuntu, er wordt dus geen gebruik gemaakt van de pihole docker image. We hebben dit bewust niet gedaan aangezien we op deze manier het onderliggend operating system meer up to date kunnen houden en zo dus minder kwetsbaarheden in het systeem hebben, anders zou je moeten wachten tot de maker van de pi-hole image dit updaten. Dit maakt de Dockerfile natuurlijk een stuk complexer.

Het pi-hole dashboard is bereikbaar via http://{your_ip}:8080/admin. De pi-hole zal de dan als het niks in zijn eigen records vindt de dns doorsturen naar onze cloudflared.

### Cloudflared

De reden waarom we cloudflared gebruiken en niet rechtstreeks naar quad9 sturen is dat pi-hole geen DNS over https verstuurt. Daarom gaan we eerst via de cloudflared en dan vervolgens naar de quad9 DNS server. We hebben gekozen voor quad9 aangezien deze dns al veel onveilige websites blokkeert. Indien gewenst kan de upstream DNS veranderd worden. Je kan dit doen door de volgende lijn te veranderen in de Dockerfile in de cloudflared folder:

```
CMD ["/usr/local/bin/cloudflared", "proxy-dns", "--address", "0.0.0.0", "--port", "5053", "--upstream", "https://dns.quad9.net/dns-query", "--upstream", "https://dns9.quad9.net/dns-query"]
```

Vervang hier de urls na de "--upstream" argumenten met de gewenste DNS.

## docker-compose.yml

Je start de services op met het volgende commando:

```
docker compose up -d
```

Naast de verschillende containers wordt er ook een default netwerk gemaakt. Ook wordt er een volume gemaakt voor de gegevens van de database in op te slaan.

## Overzicht gebruikte poorten

- 8080 (pi-hole) ==> De webinterface van pi-hole
- 53 (pi-hole) ==> De DNS van pi-hole
- 5053/udp (cloudflared)
- 4201 (angular) ==> De webinterface van angular
- 49153 (angular) ==> Zorgt ervoor dat er live wijzegingen kunnen gemaakt worden
- 3000 (backend) ==> De API
- 27017 (mongoDB) ==> De database

## Standaard rss feeds

MOET NOG AANGEVULD WORDEN!!!!!
