# Pi-hole Webinterface Gebruikersgids

Een uitgebreide gids voor het gebruik van de Pi-hole webinterface.

## Inhoudsopgave

1. [Toegang tot de Webinterface](#toegang-tot-de-webinterface)
2. [Dashboard Overzicht](#dashboard-overzicht)
3. [Navigatiemenu](#navigatiemenu)
    - [Dashboard](#dashboard)
    - [Query Log](#query-log)
    - [Long-term Data](#long-term-data)
    - [Groups](#groups)
    - [Clients](#clients)
    - [Domains](#domains)
    - [Adlists](#adlists)
    - [Disable Blocking](#disable-blocking)
    - [Local DNS](#local-dns)
    - [Tools](#tools)
4. [Veelvoorkomende Taken](#veelvoorkomende-taken)
5. [Nuttige Links](#nuttige-links)
6. [Ondersteuning](#ondersteuning)

---

## Toegang tot de Webinterface

1. **Open je webbrowser.**
2. **Navigeer naar de Pi-hole admin interface:**
   - Als je op hetzelfde netwerk bent, gebruik het IP-adres van je Pi-hole apparaat, gevolgd door poort 8082. Bijvoorbeeld: `http://<PIHOLE_IP_ADRES>:8082/admin`
   - Je kunt ook `http://pi.hole:8082/admin` gebruiken als de DNS van je netwerk is ingesteld om Pi-hole te gebruiken.

3. **Log in:**
   - Voer het wachtwoord in dat je hebt ingesteld tijdens de installatie. Als je je wachtwoord bent vergeten, kun je het resetten door `pihole -a -p` uit te voeren op het Pi-hole apparaat.

## Dashboard Overzicht

- **Totaal Aantal Vragen:** Het totale aantal DNS-vragen dat door apparaten op je netwerk is gemaakt.
- **Geblokkeerde Vragen:** Het aantal DNS-vragen dat Pi-hole heeft geblokkeerd.
- **Percentage Geblokkeerd:** Het percentage DNS-vragen dat is geblokkeerd.
- **Domeinen op Blocklist:** Het aantal domeinen dat op je blocklist staat.

## Navigatiemenu

### 1. **Dashboard**

   - Geeft een overzicht van de activiteit van je Pi-hole, inclusief vragen, geblokkeerde vragen en clientactiviteit.

### 2. **Query Log**

   - Toont een gedetailleerd logboek van alle DNS-vragen die op je netwerk zijn gemaakt.
   - Je kunt domeinen rechtstreeks vanuit dit logboek op de whitelist of blacklist zetten.

### 3. **Long-term Data**

   - De optie voor langdurige gegevens geeft je toegang tot historische gegevens over het gebruik van Pi-hole.

### 4. **Groups**

   - Voeg domeinen toe of verwijder deze die je altijd wilt blokkeren.

### 6. **Clients**

   - Voeg adlists toe of verwijder deze, dit zijn lijsten van domeinen die bekend staan om advertenties of trackingcontent te serveren.

### 7. **Domains**

   - **Update Gravity:** Forceer een update van alle blocklists.
   - **Generate Debug Token:** Genereer een token voor debugging als je hulp nodig hebt van de Pi-hole community.
   - **Network:** Bekijk alle apparaten die momenteel met je netwerk zijn verbonden.

### 8. **Adlists**

   - **System:** Beheer Pi-hole instellingen zoals DNS-servers, interface-instellingen en logging.
   - **DHCP:** Configureer Pi-hole om als je DHCP-server te fungeren, en IP-adressen uit te geven aan apparaten op je netwerk.
   - **API / Web Interface:** Beheer API- en webinterface-instellingen.
   - **Teleporter:** Maak een backup en herstel je Pi-hole configuratie.

### 9. **Disbable Blocking**

   - **Local DNS Records:** Beheer aangepaste DNS records voor je lokale netwerk.
   - **CNAME Records:** Beheer Canonical Name (CNAME) records om aliasnamen in te stellen voor bestaande DNS-namen.

### 10. Local DNS

   - Beheer lokale DNS-records en CNAME-records.

### 11. Tools

   - Voer onderhoudstaken uit, zoals het bijwerken van blocklists en het genereren van debug tokens.

## Veelvoorkomende Taken

### Een Domein Toevoegen aan de Whitelist

1. Ga naar de **Whitelist** sectie.
2. Voer het domein in dat je wilt whitelisten (bijvoorbeeld `voorbeeld.com`).
3. Klik op **Toevoegen aan Whitelist**.

### Een Domein Toevoegen aan de Blacklist

1. Ga naar de **Blacklist** sectie.
2. Voer het domein in dat je wilt blacklisten (bijvoorbeeld `ads.voorbeeld.com`).
3. Klik op **Toevoegen aan Blacklist**.

### Vragenlog Bekijken en Beheren

1. Ga naar de **Query Log** sectie.
2. Bekijk het logboek om te zien welke domeinen zijn opgevraagd en of ze zijn geblokkeerd.
3. Om een domein te whitelisten of te blacklisten, klik je op de juiste knop naast het domein in het logboek.

### Blocklists Updaten

1. Ga naar de **Tools** sectie.
2. Klik op **Update Gravity** om al je adlists te updaten.

### Lokale DNS-instellingen

1. **Lokale DNS Records toevoegen:**
   - Ga naar de **Local DNS Records** sectie in de webinterface.
   - Voer het lokale domein in dat je wilt toevoegen (bijvoorbeeld `printer.local`) en het bijbehorende IP-adres.
   - Klik op **Add** om het DNS-record op te slaan.

2. **CNAME Records beheren:**
   - Ga naar de **CNAME Records** sectie in de webinterface.
   - Voer de aliasnaam in die je wilt instellen en het echte domein waar het naar moet verwijzen (bijvoorbeeld alias `nas.local` verwijst naar `server.local`).
   - Klik op **Add** om het CNAME-record op te slaan.

### Nuttige Links

- Voor meer informatie over dnsmasq configuratie: [dnsmasq.conf.example](https://github.com/imp/dnsmasq/blob/master/dnsmasq.conf.example)
- Voor informatie over DNSSEC Root Key Signing Key: [IANA DNSSEC](https://www.iana.org/dnssec/files#:~:text=The%20Root%20Key%20Signing%20Key,facilitate%20validation%20of%20DNS%20data%20for%20all%20users%20across%20the%20world.)

## Ondersteuning

Voor extra hulp, bezoek de [Pi-hole documentatie](https://docs.pi-hole.net/) of de [Pi-hole community forums](https://discourse.pi-hole.net/).
