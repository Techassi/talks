---
theme: ./theme
highligther: shiki
color-schema: dark
aspectRatio: '16/9'
layout: intro-image
image: 'assets/bg_stripe.png'
---

<div class="absolute top-10">
    <span class="font-700">
        Sascha — 24.06.2021
    </span>
</div>

<div class="absolute bottom-10">
    <h1>dotm</h1>
    <p>dotm is a fast and easy-to-use dotfile manager</p>
</div>

---

# Inhalt

-   Warum?
-   Planung
-   Umsetzung
-   Zukunft

---
layout: image-right
image: 'assets/aliases.png'
---

# Warum?

Dotfiles (Konfigurationsdateien) zu organisieren und verwalten ist schwierig, vor allen Dingen wenn folgende Bedingungen
zutreffen:

<v-clicks :hide="false">

- Mehrere Endgeräte, wie PC, Laptop
- Diverse Betriebssysteme, wie linux-basierte (Manjaro) oder Windows 10
- Private und geschäftliche Geräte
- Backup

</v-clicks>

---
layout: section
---

# Planung

---

# Planung

<v-clicks :hide="false">

- Architektur- und Betriebssystem-unabhängig
- Einfache Integration in die (das?) CLI
- Nutzung von verschiedenen _Backends_, Provider genannt
- Unterstützung von Profilen
- Automatisches Syncing
- Sicherheit
  - 2FA
  - SSH Keys
  - Verschlüsselung der Dateien

</v-clicks>

---
layout: image-right
image: 'assets/panic_gopher.svg'
---

# In comes Go
## ...again

Einen ausführlichen Talk über Go selbst und in welchen anderen Projekten ich Go schon eingesetzt habe, gab es schon die
Vorjahre. Deshalb kurz:

<v-clicks :hide="false">

- Durch Cross-Compiling unter (L)unix, MacOS und Windows verwendbar
- Unteranderem gut für CLI Anwendungen geeignet
- Performant und typen-sicher
- Keine Generics, aber bald
- ...

</v-clicks>

---
layout: image-right
image: 'assets/command.png'
---

# Planung — CLI

<v-clicks :hide="false">

- Einfache Struktur, einfach nutzbar
- Angelehnt an andere (bekannte) Tools
- Interaktive CLI
- Hilfetexte
- Autocomplete?

</v-clicks>

---
layout: image-right
image: 'assets/init.png'
---

# Planung — Backends (Provider)

Das Backends (oder die Provider) sollen austauschbar sein:

- Integration mit vielen verschiedenen Systemen, wie Git, Radicle, rsync, etc...
- Erweiterbar durch die Community

Zu Begin: Git

---

# Planung — Profile + Syncing
## Profile

Profile sind sind Unterordner im dotm Config Ordner und werden zusätzlich in der Config verwaltet

```
.dotm
  profile-1   # Profil 1
  profile-2   # Profil 2
  .config     # dotm Config
```
---

# Planung — Profile + Syncing
## Syncing

Syncing [geplant] erfolgt über einen Systemd Timer (oder einen Windows Dienst), welcher in einem regulären Zeitabstand
die Remote Daten abgleicht.

Mit einer direkten Integration [geplant] über eine Webseite kann mit active Polling gearbeitet werden. 

---
layout: image-right
image: 'assets/yes_gopher.svg'
---

# Planung — Sicherheit

<v-clicks :hide="false">

- 2FA mittels OTP (TOTP) & FIDO [geplant]
- Unterstützung der Authentifizierung mit Hilfe von E-Mail/Username + Passwort und SSH Schlüsselpaar
- Verschlüsselung mit SSH oder GPG Key [geplant]. Hier gerne Input gewünscht!
- Noch andere Ideen? Gerne Feedback...

</v-clicks>

---
layout: section
---

# Umsetzung

---
layout: image-right
image: 'assets/structure.png'
---

# Projekt Struktur

<v-clicks :hide="false">

- _.git_: Git Ordner, duh...
- _cmd_: Alle Sub Commands, also `dotm init` oder `dotm add`
- _internal_: Haupt Logik von dotm
- _dotm.go_: Entry Datei
- _go.mod_ + _go.sum_: Dependency/Module Informationen

</v-clicks>

---
layout: image-right
image: 'assets/add_command.png'
---

# Commands

Der Root Command bildet den Einstieg in die CLI und verhält sich als würde man nur `dotm` in der Konsole eingeben. Jeder 
Sub Command ist in seiner eigenen Datei gespeichert und definiert.

```
dotm add  => cmd/add.go
dotm init => cmd/init.go
```

Jeder Sub Command durchläuft den Root Command. Mit diesem Schritt können Paramter und Flags ausgewertet und 
weitergegeben werden.

---
layout: image-right
image: 'assets/provider.png'
---

# Provider

Der Provider ist als `Interface` definiert. Ein Interface definiert zu implementierende Funktionen durch Structs (quasi 
Objekte in Go). Das erlaubt die Verwendung des Interfaces unabhängig von der gewählten Implementierung. Durch die klar
definierte Schnittstelle wird der Provider-spezifische Code abstrahiert.

---
layout: image-right
image: 'assets/git_pull.png'
---

# Pull Implementierung des Git Providers

<v-clicks :hide="false">

- Das lokale Repository wird geöffnet
- Um Änderungen an den Dateien vornehmen zu können, wird auf den Worktree von Git zugegriffen
- Anschließend werden die Dateien gepulled

</v-clicks>

---
layout: fact
---

# Blick in den Code
Auf Grund von fehlender Zeit leider nicht super viel :(

---
layout: section
---

# Zukunft

---
layout: image-right
image: 'assets/this_is_fine_gopher.svg'
---

# Zukunft

<v-clicks :hide="false">

- Git Provider fertigstellen
- Sicherheits Features implementieren
- Support für Plugins / Hooks
- Direkte Integration über `dotm.sh` oder selbst gehosteten Provider
- Eure Ideen?

</v-clicks>

<div class="absolute bottom-5">
    <span class="font-300 text-dark-300">
        slidev: https://github.com/slidevjs/slidev<br/>
        Gophers: https://github.com/MariaLetta/free-gophers-pack<br/>
        Code Snippets: https://github.com/carbon-app/carbon
    </span>
</div>