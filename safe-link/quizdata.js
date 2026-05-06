// Eksamensspørsmål for Alarmsentraloperatør 110 (BRSK)
// Kilde: Sambandsreglement 2026, KP-012, Farlige stoffer 110.pptx, operativ psykologi-pensum.
// Hver oppgave: { id, kategori, sporsmal, valg, riktig (array av indekser), forklaring }

window.QUIZ_DATA = [

  // ============ SAMBAND OG TALEGRUPPER ============
  {
    id: "sb1",
    kategori: "samband",
    sporsmal: "Hvem eier talegruppen XX-BAPS?",
    valg: ["DSB", "Politiet (POD)", "Helsedirektoratet", "HRS"],
    riktig: [1],
    forklaring: "BAPS = Brann-Akuttmedisin-Politi-Samvirke. Eies og forvaltes av politiet. Bruk besluttes av politiets operasjonssentral."
  },
  {
    id: "sb2",
    kategori: "samband",
    sporsmal: "Hvem eier talegruppen XX-SAR?",
    valg: ["DSB", "POD", "HRS", "AMK"],
    riktig: [2],
    forklaring: "XX-SAR brukes til søk og redning og eies av Hovedredningssentralen (HRS). Fast tildelt per politidistrikt (LRS)."
  },
  {
    id: "sb3",
    kategori: "samband",
    sporsmal: "Hvem har forvaltningsmessig ansvar for felles sambandsreglement (nivå 1)?",
    valg: ["DSB", "Politidirektoratet", "Helsedirektoratet", "Justisdepartementet"],
    riktig: [1],
    forklaring: "Politidirektoratet har forvaltningsmessig ansvar for felles sambandsreglement, i samarbeid med øvrige etater."
  },
  {
    id: "sb4",
    kategori: "samband",
    sporsmal: "Hvem eier nivå 2 sambandsreglement for brann- og redningsvesenet?",
    valg: ["POD", "DSB", "Brann- og redningsskolen", "Den enkelte 110-sentral"],
    riktig: [1],
    forklaring: "DSB eier og administrerer nivå 2 for brann- og redningsvesenet. Det bygger på nivå 1."
  },
  {
    id: "sb5",
    kategori: "samband",
    sporsmal: "Hvem har ansvar for å implementere sambandsreglementet i egen region?",
    valg: ["DSB", "POD", "110-sentralen", "Det enkelte vaktlag"],
    riktig: [2],
    forklaring: "110-sentralen har ansvar for å implementere sambandsreglementet i egen region og følge opp at det brukes."
  },
  {
    id: "sb6",
    kategori: "samband",
    sporsmal: "Hva er hovedformålet med XX-INNSATS-X?",
    valg: [
      "Samvirke mellom nødetater på vei til skadested",
      "Røykdykking i TMO, f.eks. tunneler og innendørsanlegg",
      "Kommunikasjon med 110-sentralen ved rutineoppdrag",
      "Helse-akutthjelpere uten politi"
    ],
    riktig: [1],
    forklaring: "XX-INNSATS-X er tiltenkt røykdykking i TMO. Har ekstra høy prioritet/bryteprioritet."
  },
  {
    id: "sb7",
    kategori: "samband",
    sporsmal: "Hvilken talegruppe er hovedtalegruppe for ledelseskommunikasjon for 110-sentralen og befal, hvor 110 har lytteplikt?",
    valg: ["XX-BAPS", "XX-SAR", "XX-BRANN-0", "NORGE BRANN"],
    riktig: [2],
    forklaring: "XX-BRANN-0 er hovedtalegruppe for ledelseskommunikasjon og aksjonssamband for 110-sentralen og befal. 110 har lytteplikt."
  },
  {
    id: "sb8",
    kategori: "samband",
    sporsmal: "Hvilken talegruppe brukes ved skogbrann 1–16?",
    valg: [
      "Administreres av Alarmsentral Brann Sørvest",
      "Administreres av DSB sentralt",
      "Administreres av nærmeste 110-sentral",
      "Administreres av Sivilforsvaret"
    ],
    riktig: [0],
    forklaring: "Skogbrann 1–16 administreres av Alarmsentral Brann Sørvest. Eies av DSB."
  },
  {
    id: "sb9",
    kategori: "samband",
    sporsmal: "Hvem eier talegruppen BEREDSKAP 1–5?",
    valg: ["DSB", "POD", "Hdir", "HRS"],
    riktig: [1],
    forklaring: "BEREDSKAP 1–5 eies av Politidirektoratet (POD) og brukes på tvers av politidistrikter ved beredskapshendelser."
  },
  {
    id: "sb10",
    kategori: "samband",
    sporsmal: "Hvem eier XX-SAMVUP (samvirke helse + akutthjelpere)?",
    valg: ["POD", "DSB", "Helsedirektoratet (Hdir)", "HRS"],
    riktig: [2],
    forklaring: "XX-SAMVUP eies av Hdir. Politi har IKKE tilgang. AMK beslutter bruk."
  },
  {
    id: "sb11",
    kategori: "samband",
    sporsmal: "Hva er fleetmap?",
    valg: [
      "Et kart over 110-sentralenes geografiske område",
      "Oversikt over hvilke talegrupper en organisasjon har tilgang til, og hvordan radioterminalen er programmert",
      "Et planleggingsverktøy for utrykningskjøring",
      "DSBs ressursdatabase for nødetater"
    ],
    riktig: [1],
    forklaring: "Fleetmap beskriver hvilke talegrupper en organisasjon har tilgang til og hvordan terminalen er programmert."
  },
  {
    id: "sb12",
    kategori: "samband",
    sporsmal: "Når må EURO DMO benyttes i stedet for nasjonale DMO talegrupper?",
    valg: [
      "Alltid ved bruk i tunneler",
      "Ved grenseoverskridende samvirke (mot Sverige/Finland)",
      "Ved øvelser",
      "Ved langvarige innsatser"
    ],
    riktig: [1],
    forklaring: "Ved grenseoverskridende samvirke skal EURO DMO benyttes, fordi nasjonale DMO-frekvenser kan gi interferens."
  },
  {
    id: "sb13",
    kategori: "farlig",
    sporsmal: "Hva betyr X foran et farenummer på oransje fareskilt?",
    valg: [
      "Eksplosjonsfare",
      "Reagerer farlig med vann",
      "Stoffet er ukjent",
      "Spesialtransport"
    ],
    riktig: [1],
    forklaring: "X foran farenummer betyr at stoffet reagerer farlig med vann. Eksempel: X423 = natrium."
  },
  {
    id: "sb14",
    kategori: "samband",
    sporsmal: "Hva er korrekt navn på arbeidstalegruppen for skogbrannhelikopter?",
    valg: ["BRANN-HELI", "BRANN HELI", "HELI BRANN", "SKOGBRANN-HELI"],
    riktig: [1],
    forklaring: "Korrekt navn i Sambandsreglement 2026 er BRANN HELI (to ord, ingen bindestrek). Eies av DSB. Merk: eldre dokumenter kan bruke skrivemåten BRANN-HELI."
  },
  {
    id: "sb15",
    kategori: "samband",
    sporsmal: "Hva er rollen til 110-sentralen i sambandshåndtering ved hendelse?",
    valg: [
      "Bare videreformidle anrop til ILKO",
      "Styre, prioritere, tildele, omdisponere og følge opp talegrupper i egen region",
      "Kun lytte og dokumentere; ILKO styrer all samband",
      "Stoppe all kommunikasjon utenfor egen region"
    ],
    riktig: [1],
    forklaring: "110-sentralen skal styre, prioritere, tildele, omdisponere og følge opp bruk av talegrupper i egen region."
  },

  // ============ STATUSMELDINGER ============
  {
    id: "st1",
    kategori: "status",
    sporsmal: "Hva betyr statusmelding 1?",
    valg: ["Fremme", "Rykker ut", "Ledig", "Beredskap"],
    riktig: [1],
    forklaring: "Status 1 = Rykker ut. Sendes når brannbilen starter utrykning."
  },
  {
    id: "st2",
    kategori: "status",
    sporsmal: "Hva betyr statusmelding 2?",
    valg: ["Rykker ut", "Fremme på sted", "Ledig på stasjon", "Disponibel"],
    riktig: [1],
    forklaring: "Status 2 = Fremme. Ressurs fremme på hendelsesstedet."
  },
  {
    id: "st3",
    kategori: "status",
    sporsmal: "Hva er forskjellen på statusmelding 5 og 6?",
    valg: [
      "5 er ledig på stasjon, 6 er ledig ute",
      "5 er ledig ute (klar, fullbemannet, ikke på stasjon), 6 er ledig stasjon (returnert)",
      "5 er ute av drift, 6 er beredskap",
      "Det er ingen forskjell"
    ],
    riktig: [1],
    forklaring: "Klassisk avkrysningsfelle: status 5 = ledig ute (klar, fullbemannet, ikke på stasjon). Status 6 = ledig stasj (returnert til stasjonen)."
  },
  {
    id: "st4",
    kategori: "status",
    sporsmal: "Hva betyr statusmelding 3?",
    valg: [
      "Ledig — full kapasitet",
      "Ikke klar — ledig men ikke full kapasitet (kan brukes ved tidskritiske hendelser)",
      "Ute av drift",
      "Disponibel skadested"
    ],
    riktig: [1],
    forklaring: "Status 3 = Ikke klar. Ledig men uten full kapasitet. Ofte forvekslet med status 5."
  },
  {
    id: "st5",
    kategori: "status",
    sporsmal: "Hva betyr statusmelding 4?",
    valg: [
      "Ledig på stasjon",
      "Disp sk. sted — ressurs fremme på sted, kan omdisponeres",
      "Beredskap",
      "Ute av drift"
    ],
    riktig: [1],
    forklaring: "Status 4 = Disp sk. sted. Ressurs er fremme på sted og kan omdisponeres."
  },
  {
    id: "st6",
    kategori: "status",
    sporsmal: "Hva betyr statusmelding 7?",
    valg: ["Beredskap", "Disponibel", "Ute av drift", "Rykker ut"],
    riktig: [2],
    forklaring: "Status 7 = Ute av drift. F.eks. service eller ressurs som ikke kan inngå i normal beredskap."
  },
  {
    id: "st7",
    kategori: "status",
    sporsmal: "Hva betyr statusmelding 8 og 9?",
    valg: [
      "8 = beredskap stasjon, 9 = sideforflyttet",
      "8 = sideforflyttet beredskap, 9 = beredskap på stasjon",
      "Begge betyr ute av drift",
      "8 = øvelse, 9 = hvile"
    ],
    riktig: [1],
    forklaring: "Status 8 = sideforflyttet beredskap. Status 9 = i beredskap på stasjonen."
  },
  {
    id: "st8",
    kategori: "status",
    sporsmal: "Hva betyr statusmelding 0?",
    valg: [
      "Ute av drift",
      "Disponibel + xmin: disponibel, men med økt forspenningstid",
      "Ledig på stasjon",
      "Rykker ut"
    ],
    riktig: [1],
    forklaring: "Status 0 = Disp + xmin. Disponibel, men med økt forspenningstid før utrykning."
  },

  // ============ FARLIGE STOFFER / CBRNE ============
  {
    id: "fs1",
    kategori: "farlig",
    sporsmal: "Hva er forskjellen på farlig stoff og farlig gods?",
    valg: [
      "Det er det samme",
      "Farlig gods er farlig stoff/gjenstand under transport, regulert av ADR/RID/IMDG/ICAO-TI",
      "Farlig stoff brukes bare på sjø, farlig gods på land",
      "Farlig gods er kun eksplosiver"
    ],
    riktig: [1],
    forklaring: "Farlig gods er farlig stoff eller gjenstand under transport, regulert av ADR/RID/IMDG/ICAO-TI."
  },
  {
    id: "fs2",
    kategori: "farlig",
    sporsmal: "Hva betyr CBRNE?",
    valg: [
      "Chemical, Biological, Radiological, Nuclear, Explosive",
      "Civil Brann og Redning, Nødnett og Eksplosiver",
      "Continuous Burning, Reactive, Noxious, Energetic",
      "Chemical, Bacterial, Reactive, Nuclear, Electrical"
    ],
    riktig: [0],
    forklaring: "CBRNE = Chemical, Biological, Radiological, Nuclear, Explosive. Samlebegrep for hendelser med kjemiske, biologiske, radiologiske, nukleære og eksplosive farer."
  },
  {
    id: "fs3",
    kategori: "farlig",
    sporsmal: "Hva er initial sikkerhetsavstand for et fast farlig stoff?",
    valg: ["25 m", "50 m", "100 m", "300 m"],
    riktig: [1],
    forklaring: "50 meter som startavstand for faste stoffer. Justeres etter mengde, vind, terreng og utvikling."
  },
  {
    id: "fs4",
    kategori: "farlig",
    sporsmal: "Hva er initial sikkerhetsavstand for væsker?",
    valg: ["50 m", "100 m fra kanten av væskedammen", "300 m", "1000 m"],
    riktig: [1],
    forklaring: "100 meter fra kanten av væskedammen. Vær oppmerksom på avrenning, damper og antennelseskilder."
  },
  {
    id: "fs5",
    kategori: "farlig",
    sporsmal: "Hva er initial sikkerhetsavstand for gasser?",
    valg: ["100 m", "200 m", "300 m", "1000 m"],
    riktig: [2],
    forklaring: "300 meter for gasser. Ved vind over ca. 2 m/s: vifteform med vinden, ca. 60°. Ved svak vind: sirkulær faresone."
  },
  {
    id: "fs6",
    kategori: "farlig",
    sporsmal: "Hva er initial sikkerhetsavstand ved fare for BLEVE?",
    valg: ["100 m", "300 m", "500 m", "1000 m"],
    riktig: [3],
    forklaring: "1000 meter ved BLEVE-fare. BLEVE = Boiling Liquid Expanding Vapour Explosion. Tank som kan revne behandles med stor avstand."
  },
  {
    id: "fs7",
    kategori: "farlig",
    sporsmal: "Hva betyr farenummer 33?",
    valg: [
      "Etsende stoff",
      "Meget brannfarlig væske",
      "Radioaktivt materiale",
      "Giftig gass"
    ],
    riktig: [1],
    forklaring: "Farenummer 33 = Meget brannfarlig væske. Gjentatt siffer forsterker faretypen."
  },
  {
    id: "fs8",
    kategori: "farlig",
    sporsmal: "Hva er UN 1203?",
    valg: ["Diesel", "Bensin", "Propan", "Natrium"],
    riktig: [1],
    forklaring: "UN 1203 = Bensin. (UN 1202 = Diesel, UN 1428 = Natrium.)"
  },
  {
    id: "fs9",
    kategori: "farlig",
    sporsmal: "Hvor finner man farenummer og UN-nummer?",
    valg: [
      "Begge øverst på det oransje skiltet",
      "Farenummer øverst (2–3 sifre), UN-nummer nederst (4 sifre)",
      "UN-nummer øverst (2–3 sifre), farenummer nederst (4 sifre)",
      "Bare på sjåførens fraktbrev"
    ],
    riktig: [1],
    forklaring: "Oransje skilt: farenummer øverst (2 eller 3 sifre, angir faretype), UN-nummer nederst (4 sifre, identifiserer stoffet)."
  },
  {
    id: "fs10",
    kategori: "farlig",
    sporsmal: "Hva er IUA?",
    valg: [
      "Internasjonalt Ulykkes- og Assistanseorgan",
      "Interkommunalt utvalg mot akutt forurensning",
      "Industriens Utrykningsavtale",
      "Inter-Utstyrs Avtale (DSB)"
    ],
    riktig: [1],
    forklaring: "IUA = Interkommunalt utvalg mot akutt forurensning. Alle kommuner deltar i et IUA."
  },
  {
    id: "fs11",
    kategori: "farlig",
    sporsmal: "Hva er RVK?",
    valg: [
      "Radio-VHF-Kjennetegn",
      "Rådgivning ved kjemikalieuhell",
      "Regional Varslings-Koordinering",
      "Risikovurdering av Kjøretøy"
    ],
    riktig: [1],
    forklaring: "RVK = Rådgivning Ved Kjemikalieuhell. 110 → Kystverket → Giftinformasjonen / kjemikaliebedrifter / ICE-nettverk."
  },
  {
    id: "fs12",
    kategori: "farlig",
    sporsmal: "Hva er Kystverkets rolle ved akutt forurensning?",
    valg: [
      "Operativ slokking i havn",
      "Statlig fagrolle for akutt forurensning og oljevern/miljøberedskap",
      "Bare meteorologisk rådgivning",
      "Ansvar for landbasert brannvern"
    ],
    riktig: [1],
    forklaring: "Kystverket har statlig ansvar og fagrolle innen akutt forurensning og oljevern/miljøberedskap."
  },
  {
    id: "fs13",
    kategori: "farlig",
    sporsmal: "Hva betyr 'akutt forurensning' juridisk?",
    valg: [
      "Forurensning av betydning som inntrer plutselig og som ikke er tillatt etter forurensningsloven",
      "Bare oljesøl på sjø",
      "All forurensning, planlagt eller ikke",
      "Kun forurensning fra industri"
    ],
    riktig: [0],
    forklaring: "Akutt forurensning = forurensning av betydning som inntrer plutselig, og som ikke er tillatt etter forurensningsloven. Gjelder sjø, vassdrag og luft. Ikke begrenset til olje."
  },
  {
    id: "fs14",
    kategori: "farlig",
    sporsmal: "Innsatspersonell og vind: hva er hovedregelen?",
    valg: [
      "Arbeide med vinden i ansiktet for å holde damper unna",
      "Arbeide med vinden i ryggen og mot skadestedet",
      "Vind har ingen betydning",
      "Følg alltid sirkulær faresone"
    ],
    riktig: [1],
    forklaring: "Innsatspersonell skal så langt mulig arbeide med vinden i ryggen og mot skadestedet. Svak vind kan gjøre faresonen sirkulær."
  },

  // ============ INNSATSLEDELSE / 7-TRINN ============
  {
    id: "il1",
    kategori: "ledelse",
    sporsmal: "Hvilket trinn i 7-trinnsmodellen er prioritert i fokusarket?",
    valg: [
      "Trinn 4: organiser skadestedet",
      "Trinn 1: les ulykken og gjør risikovurdering (skadestedsfaktorer)",
      "Trinn 7: følg opp",
      "Trinn 3: beslutt mål med innsats"
    ],
    riktig: [1],
    forklaring: "KP-012 fremhever trinn 1 — skadestedsfaktorer — som hovedfokus. Eksamen prioriterer det som høyest."
  },
  {
    id: "il2",
    kategori: "ledelse",
    sporsmal: "Hva omfatter trinn 1 i 7-trinnsmodellen — skadestedsfaktorer?",
    valg: [
      "Bare antall skadde personer",
      "Hva har skjedd, hva kan utvikle seg, hvem/hva er truet, farer, ressursbehov, begrensninger og verste troverdige utvikling",
      "Bare bygningstype og branntype",
      "Ressurser i nabokommunen"
    ],
    riktig: [1],
    forklaring: "Skadestedsfaktorer i trinn 1: tenk systematisk: hva har skjedd, hva kan utvikle seg, hvem/hva er truet, hvilke farer, hvilke ressurser, hvilke begrensninger og verste troverdige utvikling."
  },
  {
    id: "il3",
    kategori: "ledelse",
    sporsmal: "Hvilken etat har normalt overordnet koordinerende skadestedsledelse når flere nødetater er involvert?",
    valg: ["Brann", "Politi", "Helse", "Sivilforsvaret"],
    riktig: [1],
    forklaring: "Politiet har normalt overordnet koordinerende skadestedsledelse ved redningsaksjoner med flere nødetater."
  },
  {
    id: "il4",
    kategori: "ledelse",
    sporsmal: "Hva er innsatsleder brann (IL brann) sitt hovedansvar?",
    valg: [
      "Medisinsk triage",
      "Brannvesenets taktiske og faglige ledelse på skadestedet",
      "Etterforskning av brannårsak",
      "Politiets sperringer"
    ],
    riktig: [1],
    forklaring: "IL brann har brannvesenets taktiske/faglige ledelse på skadestedet, setter mål/plan, organiserer sektorer og koordinerer."
  },
  {
    id: "il5",
    kategori: "ledelse",
    sporsmal: "Hva er utrykningsleders rolle?",
    valg: [
      "Erstatter alltid IL brann",
      "Leder første utrykningsstyrke, gjør første vurdering, iverksetter strakstiltak og kan fungere som IL brann til annen leder overtar",
      "Bare sjåfør for førstebilen",
      "Ansvar bare for vedlikehold"
    ],
    riktig: [1],
    forklaring: "Utrykningsleder leder førstevaktlaget, gir situasjonsrapport, iverksetter strakstiltak og kan fungere som IL brann til ledelsen overtar."
  },
  {
    id: "il6",
    kategori: "ledelse",
    sporsmal: "Hva er 110-operatørens hovedrolle inn mot innsatsledelse?",
    valg: [
      "Ta strategiske beslutninger på vegne av IL brann",
      "Støtte med varsling, ressursoversikt, dokumentasjon, samband, informasjonsinnhenting og felles situasjonsforståelse",
      "Kun loggføre",
      "Ta over når IL brann er opptatt"
    ],
    riktig: [1],
    forklaring: "110-operatøren støtter ledelsen med varsling, ressursoversikt, dokumentasjon, samband, informasjonsinnhenting og felles situasjonsforståelse."
  },

  // ============ OPERATIV PSYKOLOGI ============
  {
    id: "p1",
    kategori: "psyk",
    sporsmal: "Hva beskriver normativ beslutningsmodell?",
    valg: [
      "Hvordan beslutninger faktisk tas under tidspress",
      "Hvordan beslutninger bør tas dersom man er rasjonell, har tid og kan vurdere alternativer systematisk",
      "Bare intuitive beslutninger",
      "Beslutninger basert på følelser"
    ],
    riktig: [1],
    forklaring: "Normativ modell = idealmodell: hvordan beslutninger BØR tas hvis man er rasjonell, har tid og kan veie alternativer."
  },
  {
    id: "p2",
    kategori: "psyk",
    sporsmal: "Hva beskriver deskriptiv beslutningsmodell?",
    valg: [
      "Idealet for rasjonell beslutning",
      "Hvordan beslutninger faktisk tas i operative situasjoner med tidspress, usikkerhet og risiko",
      "Bare beslutninger med data",
      "Beslutninger uten følelser"
    ],
    riktig: [1],
    forklaring: "Deskriptiv modell beskriver hvordan beslutninger FAKTISK tas i operative situasjoner — nært knyttet til naturalistisk/intuitiv beslutning."
  },
  {
    id: "p3",
    kategori: "psyk",
    sporsmal: "Hva er RPD (Recognition-Primed Decision Making)?",
    valg: [
      "Avansert matematisk optimaliseringsmodell",
      "Intuitiv mønstergjenkjenning der man velger typisk handling, eventuelt med mental simulering",
      "Bare en sjekkliste",
      "Tilfeldig valg av tiltak"
    ],
    riktig: [1],
    forklaring: "RPD: erfarne operatører gjenkjenner situasjonen som et mønster, velger typisk handling og kan kjøre kort mental simulering før de iverksetter."
  },
  {
    id: "p4",
    kategori: "psyk",
    sporsmal: "Hvilke tre nivåer består situasjonsbevissthet av (Endsley)?",
    valg: [
      "Sansing, hukommelse, motivasjon",
      "Persepsjon, forståelse, projeksjon",
      "Tanker, følelser, handling",
      "Input, prosess, output"
    ],
    riktig: [1],
    forklaring: "Endsley: 1) Persepsjon — oppfatte relevante elementer. 2) Forståelse — sette informasjon sammen til mening. 3) Projeksjon — forutse utvikling."
  },
  {
    id: "p5",
    kategori: "psyk",
    sporsmal: "Hva er bekreftelsesfellen?",
    valg: [
      "Å overdrive risikoen",
      "Å søke informasjon som bekrefter første antakelse og overse motstridende tegn",
      "Å bekrefte ordre over samband",
      "Å skifte mening for ofte"
    ],
    riktig: [1],
    forklaring: "Bekreftelsesfellen: man søker etter det som bekrefter første antakelse og overser tegn som motsier den."
  },
  {
    id: "p6",
    kategori: "psyk",
    sporsmal: "Beste motstrategi mot bekreftelsesfellen?",
    valg: [
      "Stole mer på første inntrykk",
      "Aktivt spørre: hva taler MOT min forståelse? Søke informasjon som kan avkrefte hypotesen",
      "Vente på at noen andre bestemmer",
      "Ikke ta beslutning før alle data er inne"
    ],
    riktig: [1],
    forklaring: "Motfellen er aktiv falsifisering: spør hva som ville talt mot din forståelse, og søk slik informasjon."
  },
  {
    id: "p7",
    kategori: "psyk",
    sporsmal: "Hva er sunken cost-fellen?",
    valg: [
      "Å investere i ny teknologi",
      "Å fortsette en innsats fordi man allerede har investert ressurser/tid, fremfor å vurdere effekt fremover",
      "Bare en økonomisk feil, ikke operativ",
      "Å gi opp for tidlig"
    ],
    riktig: [1],
    forklaring: "Sunken cost: man fortsetter en handling fordi man har investert i den, fremfor å vurdere om det fortsatt gir effekt. Mottiltak: vurder effekt, ikke prestisje/historikk."
  },
  {
    id: "p8",
    kategori: "psyk",
    sporsmal: "Hva svekkes typisk under høyt stress?",
    valg: [
      "Bare fysisk styrke",
      "Arbeidshukommelse, systematisk tenkning, lytting og nyansering",
      "Bare langtidshukommelse",
      "Kun motorikk"
    ],
    riktig: [1],
    forklaring: "Høyt stress svekker arbeidshukommelse, prioritering, lytting, systematisk tenkning og nyansering. Mer System 1/intuisjon brukes."
  },
  {
    id: "p9",
    kategori: "psyk",
    sporsmal: "Hvorfor blir prosedyrer og sjekklister ekstra viktig under stress?",
    valg: [
      "De er bare for nybegynnere",
      "De avlaster mental kapasitet når arbeidshukommelsen er redusert",
      "De gjør beslutninger tregere — det er hensikten",
      "De erstatter trening"
    ],
    riktig: [1],
    forklaring: "Prosedyrer, sjekklister, teamstøtte og trening avlaster mental kapasitet når stress reduserer arbeidshukommelsen."
  },
  {
    id: "p10",
    kategori: "psyk",
    sporsmal: "Hva er sekundærtraumatisering?",
    valg: [
      "En annen-grads brannskade",
      "Akutte reaksjoner på å bli eksponert for andres traumatiske opplevelser",
      "Det samme som utbrenthet",
      "Et fysisk skadeavtrykk"
    ],
    riktig: [1],
    forklaring: "Sekundærtraumatisering er akutte reaksjoner som operatøren kan få av å bli eksponert for andres traumatiske opplevelser — selv uten egen fysisk fare."
  },
  {
    id: "p11",
    kategori: "psyk",
    sporsmal: "Hva er forskjellen på defuse og debrief?",
    valg: [
      "Det er det samme",
      "Defuse er kort, tidlig avlastningssamtale; debrief er mer strukturert og omfattende gjennomgang",
      "Defuse er for ledere, debrief for operatører",
      "Debrief gjøres først, deretter defuse"
    ],
    riktig: [1],
    forklaring: "Defuse = kort/tidlig avlastningssamtale etter krevende hendelse. Debrief = strukturert, mer omfattende gjennomgang/bearbeiding."
  },
  {
    id: "p12",
    kategori: "psyk",
    sporsmal: "Hva er AAR (After Action Review)?",
    valg: [
      "Administrativt rapportskjema",
      "Systematisk dialog etter innsats/øvelse for læring og forbedring — fokus på hva, ikke hvem",
      "En fysisk gjennomgang av utstyr",
      "Lederens individuelle vurdering"
    ],
    riktig: [1],
    forklaring: "AAR er en systematisk dialog etter innsats/øvelse. Trygge rammer, fokus på hva (ikke hvem), læring fremover."
  },
  {
    id: "p13",
    kategori: "psyk",
    sporsmal: "Hvilke spørsmål er sentrale i AAR?",
    valg: [
      "Hvem hadde skylden?",
      "Hva var forventet å skje? Hva skjedde? Hvorfor ble det slik? Hva kan forbedres, og hvordan?",
      "Hvor mye kostet det?",
      "Hvor lenge varte innsatsen?"
    ],
    riktig: [1],
    forklaring: "AAR-spørsmålene: forventning, faktisk hendelse, årsak, forbedring. Resultatet kan sorteres som: fortsette / slutte / begynne å gjøre."
  },
  {
    id: "p14",
    kategori: "psyk",
    sporsmal: "Hva betyr 'mestring'?",
    valg: [
      "At man ikke blir påvirket av belastningen",
      "Å opprettholde funksjon og bruke hensiktsmessige strategier — selv om man er påvirket",
      "Å skjule reaksjoner",
      "Å ikke trenge støtte"
    ],
    riktig: [1],
    forklaring: "Klassisk avkrysningsfelle: mestring betyr ikke å være upåvirket, men å opprettholde funksjon og bruke hensiktsmessige strategier."
  },
  {
    id: "p15",
    kategori: "psyk",
    sporsmal: "Hva er problemfokusert mestring?",
    valg: [
      "Bearbeide følelser etter hendelsen",
      "Endre situasjonen: strukturere samtalen, innhente fakta, varsle, prioritere, bruke prosedyre",
      "Unngå å tenke på det",
      "Søke kollegastøtte"
    ],
    riktig: [1],
    forklaring: "Problemfokusert mestring: handle på selve situasjonen — strukturere, innhente fakta, varsle, prioritere. Nyttig når man kan påvirke oppgaven."
  },
  {
    id: "p16",
    kategori: "psyk",
    sporsmal: "Når er emosjonsfokusert mestring særlig nyttig?",
    valg: [
      "Når man kan endre selve situasjonen direkte",
      "Når situasjonen ikke kan endres, eller for å regulere egen reaksjon under/etter belastning",
      "Bare under øvelse, aldri i drift",
      "Aldri — det er ineffektivt"
    ],
    riktig: [1],
    forklaring: "Emosjonsfokusert mestring (pust, indre dialog, støtte, sette ord på): nyttig når situasjonen ikke kan endres, eller for å regulere egen reaksjon."
  },
  {
    id: "p17",
    kategori: "psyk",
    sporsmal: "Hva er overkonfidens som beslutningsfelle?",
    valg: [
      "Å være for forsiktig",
      "For stor tro på egen vurdering — motvirkes med kollegasjekk og tydelig verifisering",
      "Å handle for sent",
      "Å unngå å ta beslutning"
    ],
    riktig: [1],
    forklaring: "Overkonfidens = for stor tro på egen vurdering. Mottiltak: kollegasjekk, eksplisitt verifisering, søke andre perspektiver."
  },
  {
    id: "p18",
    kategori: "psyk",
    sporsmal: "Når passer analytisk beslutning best?",
    valg: [
      "Alltid, uansett situasjon",
      "Når det er tid, informasjon og mulig å vurdere alternativer systematisk",
      "Aldri i operative settinger",
      "Bare når man er stresset"
    ],
    riktig: [1],
    forklaring: "Analytisk beslutning passer best ved planlegging, evaluering, komplekse valg — når man har tid og kan vurdere alternativer."
  },

  // ============ ORGANISERING / NORDRED ============
  {
    id: "or1",
    kategori: "org",
    sporsmal: "Hva er Nordred?",
    valg: [
      "Et eget nordisk politiorgan",
      "Nordisk samarbeid for redningstjeneste og operativ bistand over landegrenser",
      "Et EU-direktiv",
      "Norges nasjonale nødnummer"
    ],
    riktig: [1],
    forklaring: "Nordred er et nordisk samarbeid for redningstjeneste og operativ bistand over landegrenser."
  },
  {
    id: "or2",
    kategori: "org",
    sporsmal: "Hvilke land er med i Nordred?",
    valg: [
      "Norge og Sverige",
      "Danmark, Finland, Island, Norge og Sverige",
      "Alle EU-land",
      "Norge, Sverige, Finland og Russland"
    ],
    riktig: [1],
    forklaring: "Nordred = Danmark, Finland, Island, Norge og Sverige."
  },
  {
    id: "or3",
    kategori: "org",
    sporsmal: "Hva er hovedformålet med Nordred-avtalen?",
    valg: [
      "Standardisere nordisk lønn for brannfolk",
      "Hindre eller begrense skade på mennesker, eiendom og miljø ved ulykker eller fare for ulykker — gjennom gjensidig bistand",
      "Felles innkjøp av brannmateriell",
      "Erstatte nasjonale nødetater"
    ],
    riktig: [1],
    forklaring: "Formålet er å hindre/begrense skade på mennesker, eiendom og miljø ved ulykker eller overhengende fare — ved å lette gjensidig bistand."
  },
  {
    id: "or4",
    kategori: "org",
    sporsmal: "Erstatter Nordred nasjonalt ansvar for redningstjenesten?",
    valg: [
      "Ja, helt og fullt",
      "Nei — det supplerer nasjonale og bilaterale ordninger, men erstatter dem ikke",
      "Bare for Sverige og Finland",
      "Bare i fredstid"
    ],
    riktig: [1],
    forklaring: "Nordred erstatter ikke nasjonalt ansvar, men supplerer nasjonale og bilaterale ordninger."
  },
  {
    id: "or5",
    kategori: "org",
    sporsmal: "Hva regulerer Nordred-avtalen i praksis?",
    valg: [
      "Detaljerte øvelsesplaner",
      "Personell, materiell, ledelse, kostnader og praktiske grensehindre ved gjensidig bistand",
      "Bare radiosamband",
      "Beredskap mot militære angrep"
    ],
    riktig: [1],
    forklaring: "Avtalen forenkler personell, materiell, ledelse, kostnader og praktiske grensehindre ved gjensidig bistand mellom landene."
  },

  // ============ VARIERTE OPPGAVER / KRISE / ELS ============
  {
    "id": "ny1",
    "kategori": "oppgaver",
    "sporsmal": "Hvilke tre nivåer inngår i situasjonsbevissthet?",
    "valg": [
      "Oppfatte, forstå, forutse/projisere",
      "Varsle, loggføre, evaluere",
      "Plan, operasjon, logistikk",
      "Lytte, betrygge, forklare"
    ],
    "riktig": [
      0
    ],
    "forklaring": "Endsley-modellen: oppfatte, forstå og forutse/projisere. Deretter kommer beslutning og handling."
  },
  {
    "id": "ny2",
    "kategori": "oppgaver",
    "sporsmal": "Hva kjennetegner intuitiv beslutningstaking?",
    "valg": [
      "Rask og erfaringsbasert",
      "Bygger på mønstergjenkjenning",
      "Krever alltid full analyse av alle alternativer",
      "Kan være sårbar for bias"
    ],
    "riktig": [
      0,
      1,
      3
    ],
    "forklaring": "Intuitiv beslutningstaking er rask og erfaring-/mønsterbasert, men kan påvirkes av beslutningsfeller."
  },
  {
    "id": "ny3",
    "kategori": "oppgaver",
    "sporsmal": "Hva er bekreftelsesfellen?",
    "valg": [
      "Å lete etter informasjon som bekrefter første antakelse",
      "Å overse informasjon som taler imot hypotesen",
      "Å alltid vente på full informasjon",
      "Å bruke riktig prosedyre"
    ],
    "riktig": [
      0,
      1
    ],
    "forklaring": "Bekreftelsesfellen gjør informasjonsinnhentingen skjev."
  },
  {
    "id": "ny4",
    "kategori": "oppgaver",
    "sporsmal": "Hva kjennetegner et høyytelsesteam?",
    "valg": [
      "Felles mål",
      "Tydelige roller",
      "Psykologisk trygghet",
      "Alle jobber isolert uten koordinering"
    ],
    "riktig": [
      0,
      1,
      2
    ],
    "forklaring": "Høyytelsesteam kjennetegnes av mål, roller, tillit, kommunikasjon, koordinering og felles situasjonsforståelse."
  },
  {
    "id": "ny5",
    "kategori": "krise",
    "sporsmal": "Hvilke kan være kognitive reaksjoner hos mennesker i krise?",
    "valg": [
      "Tunnelsyn",
      "Forvirring",
      "Svekket konsentrasjon",
      "Bedre arbeidshukommelse enn normalt"
    ],
    "riktig": [
      0,
      1,
      2
    ],
    "forklaring": "Krise kan redusere oppmerksomhet, konsentrasjon, hukommelse og informasjonsbearbeiding."
  },
  {
    "id": "ny6",
    "kategori": "krise",
    "sporsmal": "Hva ønsker operatøren å oppnå ved å forklare?",
    "valg": [
      "Forutsigbarhet",
      "Kontroll og mestring",
      "Økt usikkerhet",
      "At innringer forstår hva som skjer og hva han/hun skal gjøre"
    ],
    "riktig": [
      0,
      1,
      3
    ],
    "forklaring": "Forklaring skal redusere usikkerhet og gi retning/mestring."
  },
  {
    "id": "ny7",
    "kategori": "krise",
    "sporsmal": "Hva betyr det å parafrasere?",
    "valg": [
      "Gjenta med egne ord for å sjekke forståelse",
      "Overta samtalen og avbryte innringer",
      "Vise at man lytter",
      "Korrigere misforståelser"
    ],
    "riktig": [
      0,
      2,
      3
    ],
    "forklaring": "Parafrasering er et aktivt lyttegrep."
  },
  {
    "id": "ny8",
    "kategori": "ledelse",
    "sporsmal": "Hvilke funksjoner bygger ELS på?",
    "valg": [
      "Innsatsleder, Operasjon, Plan og Logistikk",
      "Administrasjon/økonomi, Informasjon, Sikkerhetskoordinator og Liaison",
      "Kun politi, brann og helse",
      "Kun 110-sentralen"
    ],
    "riktig": [
      0,
      1
    ],
    "forklaring": "ELS-funksjonene (DSB-veileder): hovedfunksjoner — Innsatsleder, Planlegging og miljø, Operasjon, Logistikk. Støttefunksjoner — Økonomi/administrasjon, Juridisk, Informasjon, IKT, Sikkerhetskoordinator, Liaison."
  },
  {
    "id": "ny9",
    "kategori": "psyk",
    "sporsmal": "Hva kan være forankringsfeller?",
    "valg": [
      "Første melding",
      "Første hypotese om hendelsestype",
      "Første stedsforståelse/adresse",
      "Bevisst revurdering av ny informasjon"
    ],
    "riktig": [
      0,
      1,
      2
    ],
    "forklaring": "Forankring betyr at første informasjon får uforholdsmessig stor vekt."
  },
  {
    "id": "ny10",
    "kategori": "psyk",
    "sporsmal": "Hvilke fire aspekter inngår i emosjonell intelligens?",
    "valg": [
      "Oppfatte emosjoner",
      "Anvende emosjoner",
      "Forstå emosjoner",
      "Regulere emosjoner"
    ],
    "riktig": [
      0,
      1,
      2,
      3
    ],
    "forklaring": "Emosjonell intelligens handler om å oppfatte, anvende, forstå og regulere emosjoner."
  },
  {
    "id": "ny11",
    "kategori": "psyk",
    "sporsmal": "Hvilke er relevante typer stress i pensum/undervisning?",
    "valg": [
      "Akutt og kronisk stress",
      "Sekundærtraumatisk stress",
      "Moralsk stress og identifikasjonsstress",
      "Beslutningstretthet og utbrenthet"
    ],
    "riktig": [
      0,
      1,
      2,
      3
    ],
    "forklaring": "Alle alternativene er relevante begreper for 110-operatørens belastning og mestring."
  },
  {
    "id": "ny12",
    "kategori": "krise",
    "sporsmal": "Hva kan kjennetegne kriser?",
    "valg": [
      "Uventet/akutt situasjon",
      "Tidspress og usikkerhet",
      "Tap av kontroll og sterke emosjoner",
      "Alltid full informasjon"
    ],
    "riktig": [
      0,
      1,
      2
    ],
    "forklaring": "Kriser preges ofte av akutt trussel, tidspress, usikkerhet, sterke emosjoner og informasjonsmangel."
  }
];
