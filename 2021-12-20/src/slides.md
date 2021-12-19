---
theme: ./theme
highlighter: shiki
lineNumbers: false
layout: intro
title: Lustiges Implementieren von RFCs
---

# Lustiges Implementieren von RFCs

Domain Name System (DNS)

<div class="absolute bottom-10">
    <span class="font-700">
        UnFUG | Sascha | 20.12.21 | <a href="https://github.com/Techassi/talks/tree/main/2021-12-20">https://github.com/Techassi/talks</a>
    </span>
</div>


---

# Inhalt

<div class="grid grid-cols-2 gap-x-4 gap-y-4">
<div class="card">

### #1 Was sind RFCs?

Ein kurzer Überblick von RFCs

</div>

<div v-click class="card">

### #2 Was ist DNS?

High-Level Übersicht und Historie von DNS

</div>

<div v-click class="card">

### #3 Lesen (und verstehen) der RFCs

Theoretische Grundlagen von DNS mit Hilfe von RFCs verstehen

</div>

<div v-click class="card">

### #4 Ran ans Werk

Implemetierung eines DNS Servers

</div>

<div v-click class="card">

### #5 Frageründchen

All eure Fragen :)

</div>
</div>

---
layout: section
---

# Was sind RFCs?

---

# RFCs

<div class="grid grid-cols-2 gap-x-4">
<div>

- RFC is die Kurzschreibweise für 'Request for Comments', also 'Bitte um Kommentare'
- Eine Reihe technischer Dokumente zum Internet
- RFCs werden in 3 Kategorien eingeteilt: STD, BCP und (FYI) <MarkerDiscontinued />

</div>
<div v-click>

Einige RFCs, aber nicht alle, definieren Internetstandards, wie zum Bsp.: 
  - IP <InlineMarkerRFC text="791" />
  - UDP <InlineMarkerRFC text="768" />
  - und DNS <InlineMarkerRFC text="1035" />
</div>
</div>

<!-- 
RFCs werden mit einer durchlaufenden Zahl benannt
-->

---

# RFCs

<div class="grid grid-cols-2 gap-x-4">
<div>

### Editors / Verfasser

- Internet Engineering Task Force (IETF)
- Internet Architecture Board (IAB)
- Internet Research Task Force (IRTF)
- Unabhängige Beitragende

</div>
<div v-click>

### Status

- Proposed Standard, Draft Standard, Internet Standard
- Best Current Practice
- Historic / Obsolete
- Informational
- Experimental
- Unknown
- Draft

</div>
</div>

<!-- 
- Unknown (unbekannt): Dem RFC ist kein Status zugeordnet. Dies trifft auf einige frühe RFCs zu.
- Draft (Entwurf): Kein RFC, da noch im Entwurfsstadium.
- Informational (informativ): Informatives Dokument jeglicher Art, beispielsweise Terminologie-Erklärungen, Nutzungshinweise
- Experimental (experimentell): Protokollspezifikation, die als Teil eines Forschungs- oder Entwicklungsvorhaben entstand
- Best Current Practice (beste gegenwärtige Praxis): Ein technisches Dokument, das durch Veröffentlichung in der Dokumentenreihe BCP einen verbindlichen Charakter erhält.
- Wird eine Spezifikation durch ein neues RFC abgelöst, wird hingegen der Status Obsolete verwendet
-->

---
layout: section
---

# Was ist DNS?

---
layout: quote
---

# "The Domain Name System (DNS) is the hierarchical and decentralized naming system used to identify computers, services, and other resources reachable through the internet"
Wikipedia, [Domain Name System](https://en.wikipedia.org/wiki/Domain_Name_System)

---

# Geschichtsstunde

<div class="grid grid-cols-2 gap-x-4">
<div>

### Die Lage vor DNS <InlineMarkerRFC text="1034 (Section 2.1)" url="https://datatracker.ietf.org/doc/html/rfc1034#section-2.1" />

<v-clicks>

- Alle Verknüpfungen von Host Namen zu IPs wurden von dem NIC in EINER! `HOSTS.TXT` Datei verwaltet, welche von ALLEN 
  Hosts über FTP abgerufen wurde.
- Durch den großen Wachstum an Hosts geriet dieses System schnell an seine Grenzen

</v-clicks>

</div>
<div>

<div v-click>

### Host Table Format <InlineMarkerRFC text="952" />

```
NET : 10.0.0.0 : ARPANET :
NET : 128.10.0.0 : PURDUE-CS-NET :
GATEWAY : 10.0.0.77, 18.10.0.4 : MIT-GW.ARPA,MIT-GATEWAY : 
          PDP-11 : MOS : IP/GW,EGP :
HOST : 26.0.0.73, 10.0.0.51 : SRI-NIC.ARPA : 
       DEC-2060 : TOPS20 : TCP/TELNET,TCP/ECHO,ICMP :
```

</div>

<div v-click>

TOPS-20 ist ein proprietäres Betriebssystem für [DEC](https://en.wikipedia.org/wiki/Digital_Equipment_Corporation) 36bit
Mainframes auf Basis von TENEX und ist in Assembly geschrieben. (Erstveröffentlichung: 1976)

</div>

</div>
</div>

<!-- 
## NIC: Network Information Center

## Host Table Format

- Feld 1: KEYWORD indicating whether this entry pertains to a NET, GATEWAY, HOST, or DOMAIN.  NET entries are assigned 
  and cannot have alternate addresses or nicknames. DOMAIN entries do not use fields 4, 5, or 6.
- Feld 2: Internet Address of Network, Gateway, or Host followed by alternate addresses. Addresses for a Domain are 
  those where a Domain Name Server exists for that domain.
- Feld 3: Official Name of Network, Gateway, Host, or Domain (with optional nicknames, where permitted).
- Feld 4: Machine Type
- Feld 5: Operating System
- Feld 6: Protocol List

-->

---

# Geschichtsstunde

### Protokoll

TCP Verbindung über Port 101 auf Host `SRI-NIC.ARPA` (26.0.0.73 oder 10.0.0.51)

<div class="grid grid-cols-2 gap-x-4">
<div :class="[ $slidev.nav.clicks > 3 ? 'opacity-40' : '' ]">

<div v-click>

### Requests <InlineMarkerRFC text="953" />

```
<command key> <argument(s)> [<options>]

HNAME SRI-NIC.ARPA <CRLF>
```

</div>
<v-clicks>

- Text Query Requests (in Plain Text)
- Verschiedene Command Keys, wie `HNAME`, `ALL` oder `DOMAINS`

</v-clicks>

</div>
<div>

<div v-click>

### Response <InlineMarkerRFC text="953" />

```
<response key> : <rest of response>

HOST : 26.0.0.73, 10.0.0.51 : SRI-NIC.ARPA,SRI-NIC,NIC :
       DEC-2060 : TOPS20 : TCP/TELNET,TCP/SMTP,TCP/TIME,
       TCP/FTP,TCP/ECHO,ICMP :
```

</div>

<v-clicks>

- Antworten in Plain Text
- Verschiedene Response Keys, wie `NET`, `HOST` oder `ERR`
- Error Codes: `NAMNFD`, `ADRNFD`, `ILLCOM` und `TMPSYS`

</v-clicks>

</div>
</div>

<!-- 
## Command Keys:

- HNAME: One or more matching host table entries.
- ALL: The entire host table.
- DOMAINS: The entire top-level domain table (domains only).

## Error codes

- NAMNFD: Name not found; name not in table
- ADRNFD: Address not found; address not in table
- ILLCOM: Illegal command; command key not recognized
- TMPSYS: Temporary system failure, try again later
-->

---

# Vergleich

<div class="grid grid-cols-2 gap-x-4">
<div>

### DNS <InlineMarkerRFC text="1035" />

```
- Primär über UDP (aber auch TCP)
- Baumartige Namesstruktur
- Jedes Blatt kann 0 - n Dateneinträge beinhalten, 
  sog. Resource Records, kurz RRs
- Client- / Serverarchitektur
- Verteilt
```

</div>
<div v-click>

### DOD INTERNET HOST TABLE SPECIFICATION <InlineMarkerRFC text="952" />

```
<- Nur TCP
<- Tabellen Struktur
<- Jeder "Record" ist eine Zeile

<- Auch Client- / Serverarchitektur
<- Zentral
```

</div>
</div>

---
layout: section
---

# Lesen (und verstehen) der RFCs

---

# DNS RFCs

<div :class="[ $slidev.nav.clicks > 0 ? 'opacity-40' : '' ]">

Es gibt zwei grundlegende RFCs, welche das Protkoll DNS definieren:

- Domain Names - Concepts and Facilities <InlineMarkerRFC text="1034" />
- Domain Names - Implementation and Specification <InlineMarkerRFC text="1035" />

</div>

<div v-click class="max-w-lg">

Mit der Zeit (und den wachsenden Ansprüchen an DNS) sind weitere ergänzende RFCs hinzu gekommen:

</div>

<v-clicks>

- A Means for Expressing Location Information in the Domain Name System (LOC RR) <InlineMarkerRFC text="1876" />
- Incremental Zone Transfer in DNS <InlineMarkerRFC text="1995" />
- Extension Mechanisms for DNS (EDNS(0)) <InlineMarkerRFC text="6891" />
- und weitere ...

</v-clicks>

---

# Ziele von DNS

<InlineMarkerRFC text="1034" /> beschreibt diverse Ziele:

<div class="grid grid-cols-2 gap-x-4">

<v-clicks :every='2'>

Verteilte Infrastruktur und lokales Caching

```
The sheer size of the database and frequency of updates
suggest that it must be maintained in a distributed manner,
with local caching to improve performance. [...]
```

Abrufen von diversen Daten, welche nicht nur einen Anwendungsfall abdecken

```
[...] that it be generally useful, and not restricted 
to a single application. We should be able to use names 
to retrieve host addresses, mailbox data, and other as 
yet undetermined information. [...]
```

Nutzung von UDP und TCP

```
We want name server transactions to be independent of the 
communications system that carries them. [...]
```

</v-clicks>

</div>

---

# Resource Records (RRs)

<div class="grid grid-cols-2 gap-x-4">
<div :class="[ $slidev.nav.clicks > 0 ? 'opacity-40' : '' ]">

### Definition <InlineMarkerRFC text="1034 (Section 3.6)" url="https://datatracker.ietf.org/doc/html/rfc1034#section-3.6" />

```
A domain name identifies a node. Each node has a set of 
resource information, which may be empty. The set of 
resource information associated with a particular name 
is composed of separate resource records (RRs). [...]
```

Resource Records beschreiben Daten, welche zu einer Node in einem Baum gehören.

</div>
<div v-click>

### Aufbau eines RRs <InlineMarkerRFC text="1034 (Section 3.6)" url="https://datatracker.ietf.org/doc/html/rfc1034#section-3.6" />

```
OWNER    which is the domain name where the RR is found.

TYPE     which is an encoded 16 bit value that specifies
         the type of the resource in this resource record.

CLASS    which is an encoded 16 bit value which identifies 
         a protocol family or instance of a protocol.

TTL      which is the time to live of the RR. [...]

RDATA    which is the type and sometimes class dependent 
         data which describes the resource [...]
```

</div>
</div>

---

# Baumstruktur der Domain Names

RFC 1034 empfiehlt die Implementierung von Zonen und Caches als Baumstruktur.

```ts {all|5|9|10-11|all}
                                         root
                                          V
                 +------------------------.------------------------+
                 |                                                 | 
                com                                               dev                          | TLDs
                 |                                                 |
   +-------------+-------------+                                   +----...
   |                           |                                   |
example                      google                             techassi            
- A: 93.184.216.34           - A: 142.250.184.238               - A: 104.21.74.39              | RRs
- TXT: "v=spf1 -all"         - MX: 10 aspmx.l.google.com.       - MX: 1 mail.techassi.dev.     |

```

---

# Zusammenfassung

In *RFC 1034* werden theoretische Grundlagen von DNS definiert und erklärt. Im Gegensatz dazu beinhaltet *RFC 1035*
Details zur technischen Implementierung. In der nächsten Sektion werden wir fast nur noch mit diesem arbeiten.

<v-clicks>

- Domain Namen sind in einer Baumstruktur organisiert
- Jedes Blatt (Node) kann 0-n Resource Records beinhalten
- RRs beschreiben Daten zu dieser Node
- RRs haben verschiedene Typen, Klassen und Inhalte

</v-clicks>

---
layout: section
---

# Ran ans Werk

---
clicks: 10
---

# Server / Client Architektur

<div class="grid grid-cols-2 gap-x-4">
<div :class="[ $slidev.nav.clicks > 6 ? 'opacity-40' : '' ]">

### Server

Ein DNS Server übernimmt folgende Aufgaben:

<v-clicks>

- Bearbeitung von einkommenden DNS Anfragen (Queries / Questions)
- Anfragen können auf Grund von diversen Gründen abgelehnt werden
- Anfragen nach unbekannten Domain Names können auf diverse Arten behandelt werden
- Server-seitiges Caching
- Logging von Anfragen
- noch mehr? Bestimmt...

</v-clicks>

</div>
<div v-click="7">

### Client

Ein DNS Client ist für folgende Aufgaben zuständig:

<v-clicks>

- Aufkommende DNS Anfragen (von User Space Programmen) bearbeiten
- DNS Query erstellen und an Server senden
- Antworten interpretieren
- Lokales Client-seitiges Caching

</v-clicks>

</div>
</div>

---

# Fachjargon

### Bit

Kleinste binäre Einheit: Kann Wert *0* oder *1* annehmen

<div v-click>

### Octet

8 Bit: `00 00 00 00` oder `10 00 00 01`

Warum nicht Byte? Früher war ein Byte nicht unbedingt 8 Bit. Bytes haben früher Werte zwischen 4 und 10 Bits angenommen.
Aufgrunddessen hat man sich entschieden die Einheit *Octets* zu nehmen (Octo => Acht in Griechisch und Latein).

</div>

<div v-click>

### Endianness

Endianness oder *Most significant bit (MSB)* gibt an, welches Bit das höchste ist:

- Big Endian: Das höchste Bit ist links. `10 00 00 00` => 128
- Little Endian: Das höchste Bit ist rechts. `10 00 00 00` => 1

DNS arbeitet mit dem *Big Endian* System (Ist auch die gängigste Schreibweise).

</div>

---

# RRs auf dem 'Wire' <MarkerRFC text="1035 (3.2.1)" url="https://datatracker.ietf.org/doc/html/rfc1035#section-3.2.1" />

Das 'Wire' Format gibt an, wie Daten in binärer Form über das 'Wire' (Kabel) transportiert werden.

<!-- TODO: Format grafisch als Component darstellen -->

```
                                1  1  1  1  1  1
  0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|                                               |    Max 255 octets: Owner Name <domain-name>
/                                               /
/                      NAME                     /
|                                               |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|                      TYPE                     |    2 octets: RR type <uint16>
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|                     CLASS                     |    2 octets: RR class <uint16>
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|                      TTL                      |    4 octets: Time-to-live; Interval für Caching <uint32>
|                                               |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|                   RDLENGTH                    |    2 octets: Länge von RDATA <uint16>
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--|
/                     RDATA                     /    Max 255 octets: RR Daten
/                                               /
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
```

---

# RR Types <MarkerRFC text="1035 (3.2.2)" url="https://datatracker.ietf.org/doc/html/rfc1035#section-3.2.2" />

RR Typen definieren die Art von Resource Records. Umgangssprachlich Record. Einige bekannte Typen sind:

<div class="grid grid-cols-3 gap-x-4 gap-y-4">
<v-clicks>
<div class="card">

### A (1)

Eine IPv4 Host Adresse

```
93.184.216.34
```

</div>

<div class="card">

### NS (2)

Ein Authoritative **N**ame **S**erver

```
a.iana-servers.net.
```

</div>

<div class="card">

### CNAME (5)

Canonical Name für ein Alias

```
mail.techassi.dev
```

</div>

<div class="card">

### MX (15)

Mail Exchange

```
1 mail.techassi.dev.
```

</div>

<div class="card">

### TXT (16)

Text

```
"v=spf1 mx -all"
```

</div>

<div class="card">

### AAAA (28)

Eine IPv6 Host Adresse

```
2a00:1450:4001:831::200e
```

</div>
</v-clicks>
</div>

---

# RR Classes <MarkerRFC text="1035 (3.2.4)" url="https://datatracker.ietf.org/doc/html/rfc1035#section-3.2.4" />

Klassen beschreiben verschiedene Netzwerke. Das bekannteste und heute genutzte Netz ist das Internet auf Basis von IP.
DNS erlaubt somit die Bereitstellung von RRs für verschiedene Netze.

<div class="grid grid-cols-3 gap-x-4 gap-y-4">
<v-clicks>
<div class="card">

### IN (1)

The Internet

</div>

<div class="card">

### CS (2)

The CSNET <MarkerDiscontinued text="Obsolet" />

</div>

<div class="card">

### CH (3)

The CHAOS net

</div>

<div class="card">

### HS (4)

Hesiod [Dyer 87]

</div>
</v-clicks>
</div>

---

# RRs in Go <InlineMarkerCode text="pkg/types/rr/rr.go" />

<div class="grid grid-cols-2 gap-x-4 gap-y-4">
<div>

```go
type RR interface {
  // Get header of RR
  Header() *Header

  // Set header of RR
  SetHeader(Header)

  // Set resource record data
  SetData(...interface{}) error

  // String returns the representation of any RR as text
  String() string

  // Len returns the records RDLENGTH
  Len() uint16

  // Unpack unpacks the RDATA
  Unpack([]byte, int) (int, error)

  // Pack packs the RDATA
  Pack([]byte, int) (int, error)
}
```

</div>
<div>

```go
type Header struct {
  // Name specifies an owner name
  Name string

  // Type specifies a RR type code
  Type uint16

  // Class specifies a RR class code
  Class uint16

  // TTL specifies the time interval in seconds that the 
  // RR may be cached before it should be considered 
  // outdated
  TTL uint32

  // RDLength specifies the length of RDATA in octets
  RDLength uint16
}
```

</div>
</div>

---

# Message Format

<div class="grid grid-cols-5 gap-x-4 gap-y-4">
<div class="col-span-2" :class="[ $slidev.nav.clicks > 0 ? 'opacity-40' : '' ]">

### Message

Eine DNS Nachricht ist in 5 Abschnitte unterteilt.

<DNSMessage :inactive="$slidev.nav.clicks > 0" />

</div>
<div v-click class="col-span-3 col-start-3">

### Header

Der Header hat eine feste Größe von 6 * 16 Bits = 96 Bits (12 Octets).

<DNSHeader />

</div>
</div>

---

# DNS Message in Go <InlineMarkerCode text="pkg/types/dns/message.go" />

<div class="grid grid-cols-2 gap-x-4 gap-y-4">
<div>

```go
type Message struct {
  Header     Header
  Question   []Question
  Answer     []rr.RR
  Authority  []rr.RR
  Additional []rr.RR

  Compression CompressionMap
}
```

<div v-click>

```go
type Code uint16

const (
  NoError Code = iota
  FormatError
  ServerFailure
  NameError
  NotImplemented
  Refused
)
```

</div>

</div>
<div>

```go
type Header struct {
  ID                 uint16      // ID
  IsQuery            bool        // QR
  OpCode             opcode.Code // OPCODE
  Authoritative      bool        // AA
  Truncated          bool        // TC
  RecursionDesired   bool        // RD
  RecursionAvailable bool        // RA
  Zero               bool        // Z
  RCode              rcode.Code  // RCODE
  QDCount            uint16      // Question count
  ANCount            uint16      // Answer count
  NSCount            uint16      // Authority count
  ARCount            uint16      // Additional record count
}
```

<div v-click>

```go
type Code uint16

const (
  Query Code = iota
  IQuery
  Status
)
```

</div>

</div>
</div>

---

# DNS Question in Go <InlineMarkerCode text="pkg/types/dns/question.go" />

```go
type Question struct {
	Name  string
	Type  uint16
	Class uint16
}
```

---

# (Un)packer <InlineMarkerCode text="pkg/packers/*" />

<div class="grid grid-cols-2 gap-x-4 gap-y-4">
<div>

### Unpacker <InlineMarkerCode text="pkg/packers/unpacker.go" />

Der Unpacker wandelt den Byte Nuffer von einkommenden DNS Nachrichten in Structs um

```go
type Unpacker interface {
	Unpack(dns.Header, []byte, int) (dns.Message, error)

	UnpackHeader([]byte) (dns.Header, int, error)

	UnpackQuestion([]byte, int) (dns.Question, int)

	UnpackRRList(uint16, []byte, int) ([]rr.RR, int, error)

	UnpackRR([]byte, int) (rr.RR, int, error)

	UnpackRRHeader([]byte, int) (rr.Header, int)
}
```

</div>
<div v-click>

### Packer <InlineMarkerCode text="pkg/packers/packer.go" />

Der Packer wandelt Structs in einen Byte Buffer um, welcher zurück an Clients gesendet wird

```go
type Packer interface {
  Pack(dns.Message) ([]byte, error)

  PackHeader(dns.Header, []byte, int) (int, error)

  PackQuestion(dns.Question, []byte, int) (int, error)

  PackRRList([]rr.RR, []byte, int) (int, error)

  PackRR(rr.RR, []byte, int) (int, error)

  PackRRHeader(*rr.Header, []byte, int) (int, error)
}
```

</div>
</div>

---

# Eine Ebene tiefer (1) <InlineMarkerCode text="pkg/pack/*" />

```go
func UnpackUint8(data []byte, offset int) (uint8, int) {
	return data[offset], offset + 1
}
```

```go
func UnpackIPv6Address(data []byte, offset int) (net.IP, int) {
	hi, offset := UnpackUint64(data, offset)
	lo, offset := UnpackUint64(data, offset)

	ip := make(net.IP, net.IPv6len)
	binary.BigEndian.PutUint64(ip, hi)
	binary.BigEndian.PutUint64(ip[8:], lo)

	return ip, offset
}
```

---

# Eine Ebene tiefer (2) <InlineMarkerCode text="Kein valider Go Code" />

```go
func UnpackDomainName(data []byte, offset int) (string, int) {
  if (data[offset] == 0x00) return "."; offset + 1

  for {
    b := int(data[offset]); offset++

    switch b & 0xC0 {
    case 0x00:
      if b == 0x00 {
        break
      }

      buf = append(buf, data[offset:offset+b]...)
      buf = append(buf, '.'); offset += b
    case 0xC0:
      if (!followed) offsetBeforePtr = offset + 1
      offset = int(b^0xC0)<<8 | int(data[offset])
      followed = true
    }
  }

  if (followed) offset = offsetBeforePtr
  return string(buf), offset
}
```

---

# Multiplexing <InlineMarkerCode text="pkg/server/*" />

```go
func (s *Server) Run() error {
  if s.isRunning() {
    return ErrServerAlreadyRunning
  }

  switch s.Network {
  case "udp", "udp4", "udp6":
    listener, err := createUDPListener(s.Network, s.Address, s.Port)
    if err != nil {
      return err
    }
    s.UDPListener = listener
    go s.serveUDP()
    return nil
  case "tcp", "tcp4", "tcp6":
    listener, err := createTCPListener(s.Network, s.Address, s.Port)
    if err != nil {
      return err
    }
    s.TCPListener = listener
    go s.serveTCP()
    return nil
  }

  return ErrNoSuchNetwork
}
```

---

# Weitere interessante Code Ausschnitte

... welche ich in diesem Vortrag nicht im Detail vorstelle. Dennoch können wir uns diese gerne nach dem Talk gemeinsam 
anschauen.

<v-clicks>

- Cache / Store
- Master Zones
- Resolver
- EDNS

</v-clicks>

---

# Aktueller Stand / Ausblick

<div class="grid grid-cols-2 gap-x-4 gap-y-4">
<div>

### Unterstützte RFCs

Folgende RFCs sind zum Großteil unterstütz. Sicherlich mit Bugs und diversen Edge Cases :)

- Concepts and Facilities [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034)
- Implementation and Specification [RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035)
- Serial Number Arithmetic [RFC 1982](https://datatracker.ietf.org/doc/html/rfc1982)
- Extension Mechanisms for DNS [RFC 6891](https://datatracker.ietf.org/doc/html/rfc6891)

</div>
<div v-click>

### Ausblick

- RPZs [DRAFT Vixie DNS RPZ](https://datatracker.ietf.org/doc/html/draft-vixie-dns-rpz-00)
- LOC RR [RFC 1876](https://datatracker.ietf.org/doc/html/rfc1876)
- Incremental Zone Transfer in DNS [RFC 1995](https://datatracker.ietf.org/doc/html/rfc1995)
- und weitere ...

</div>
</div>

---
layout: intro-image-right
image: './img/this_is_fine_gopher.svg'
---

# Frageründchen

All eure Fragen :)

---

# Quellen

<div class="grid grid-cols-2 gap-x-4 gap-y-4">
<div>

- [RFC 952](https://datatracker.ietf.org/doc/html/rfc952)
- [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034)
- [RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035)
- [RFC 1876](https://datatracker.ietf.org/doc/html/rfc1876)
- [RFC 1982](https://datatracker.ietf.org/doc/html/rfc1982)
- [RFC 1995](https://datatracker.ietf.org/doc/html/rfc1995)
- [RFC 6891](https://datatracker.ietf.org/doc/html/rfc6891)

</div>
<div>

- Slidev: [https://github.com/slidevjs/slidev](https://github.com/slidevjs/slide)
- Slidev Theme: [https://github.com/slidevjs/themes/tree/main/packages/theme-apple-basic](https://github.com/slidevjs/themes/tree/main/packages/theme-apple-basic)

</div>
</div>