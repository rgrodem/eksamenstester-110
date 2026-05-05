from html import escape
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parent


def p(text):
    return f"<p>{text}</p>"


def ul(items, klass=""):
    cls = f' class="{klass}"' if klass else ""
    return "<ul{}>\n{}\n</ul>".format(cls, "\n".join(f"  <li>{item}</li>" for item in items))


def ol(items):
    return "<ol>\n{}\n</ol>".format("\n".join(f"  <li>{item}</li>" for item in items))


def section(num, title, body):
    return f'<section id="s{num}" class="card">\n<h2>{num}. {title}</h2>\n{body}\n</section>'


def table(headers, rows):
    head = "".join(f"<th>{h}</th>" for h in headers)
    body = "\n".join("<tr>" + "".join(f"<td>{c}</td>" for c in row) + "</tr>" for row in rows)
    return f'<table class="grid"><thead><tr>{head}</tr></thead><tbody>{body}</tbody></table>'


focus_items = [
    "<strong>Organisering av beredskap:</strong> samarbeidsavtaler med andre land, særlig Nordred-avtalen. <span class=\"prio middels\">prioritet: middels</span>",
    "<strong>Farlige stoffer, CBRNE og akutt forurensning:</strong> begrepsskille, fare-/UN-nummer, initial sikkerhetsavstand, Kystverket og IUA. <span class=\"prio hoy\">prioritet: høy</span>",
    "<strong>Innsatsledelse:</strong> ansvarsfordeling brann/politi/helse, IL brann og utrykningsleder, 7-trinnsmodellen med skadestedsfaktorer. <span class=\"prio hoy\">prioritet: høy</span>",
    "<strong>Sambandsreglement:</strong> eierskap og administrasjon av nasjonale og internasjonale talegrupper. <span class=\"prio middels\">prioritet: middels</span>",
    "<strong>Operativ psykologi — beslutninger:</strong> normative/deskriptive modeller, analytiske/intuitive beslutninger, beslutningsfeller og risikopersepsjon. <span class=\"prio hoy\">prioritet: høy</span>",
    "<strong>Operativ psykologi — stress og emosjoner:</strong> emosjoner, stress, mental kapasitet, systematisk tenkning og mestringsstrategier. <span class=\"prio hoy\">prioritet: høy</span>",
]

focus_transcribed = [
    "Organisering av beredskap mot brann, ulykke og akutt forurensning: kjenne til samarbeidsavtaler med andre land, f.eks. Nordred-avtalen.",
    "Farlige stoffer, CBRNE og akutt forurensning: skille mellom farlige stoffer, farlig gods, CBRNE og akutt forurensning.",
    "Farlige stoffer: forstå håndregler for initial sikkerhetsavstand basert på farenummer.",
    "Farlige stoffer: beherske identifisering av stoff på UN-nummer og kunne innhente informasjon.",
    "Akutt forurensning: kjenne til hvordan Kystverket håndterer akutt forurensning eller fare for akutt forurensning.",
    "Innsatsledelse: forstå ansvarsfordeling mellom brann, politi og helse på skadested.",
    "Innsatsledelse: forstå innsatsleder brann og utrykningsleder sine oppgaver og funksjoner på skadested.",
    "Innsatsledelse: forstå 7-trinnsmodellen, med vekt på skadestedsfaktorer.",
    "Sambandsreglement: forstå eierskap og administrasjon av nasjonale og internasjonale talegrupper.",
    "Operativ psykologi, beslutninger: kjenne forskjellen på normative og deskriptive modeller for beslutningstaking.",
    "Operativ psykologi, beslutninger: forstå forskjellen på analytiske og intuitive beslutninger.",
    "Operativ psykologi, beslutninger: forstå hvordan beslutningsfeller kan påvirke beslutninger.",
    "Operativ psykologi, beslutninger: forstå risikopersepsjon og hvordan dette påvirker mennesker.",
    "Operativ psykologi, stress og emosjoner: kjenne begrepet emosjoner og betydningen dette har på operatøren.",
    "Operativ psykologi, stress og emosjoner: forstå hvordan stress påvirker mental kapasitet og evne til systematisk tenkning.",
    "Operativ psykologi, stress og emosjoner: forstå ulike mestringsstrategier for å håndtere stress.",
]

varierte = [
    ("Oppgave 1: Sett inn rette ord i modellen for situasjonsbevissthet.", "1 Oppfatte, 2 Forstå, 3 Forutse/projisere, deretter Beslutte og Handle."),
    ("Oppgave 2: Nevn minst 3 ting om å være intuitiv.", "Erfaringsbasert, rask/automatisk, mønstergjenkjenning, krever lite bevisst analyse, nyttig under tidspress, men sårbar for bias."),
    ("Oppgave 3: Gi kort redegjørelse for bekreftelsesfellen.", "Tendens til å søke, tolke og vektlegge informasjon som bekrefter første antakelse, og overse informasjon som taler imot."),
    ("Oppgave 4: Hva definerer et høyytelsesteam?", "Felles mål, tydelige roller, gjensidig avhengighet, god kommunikasjon, tillit, psykologisk trygghet, koordinering og felles situasjonsforståelse."),
    ("Oppgave 5: Mulige kognitive reaksjoner hos mennesker i krise.", "Tunnelsyn, forvirring, svekket konsentrasjon, hukommelsesvansker, redusert informasjonsbearbeiding, handlingslammelse og dårligere problemløsning."),
    ("Oppgave 6: Hva ønsker vi å oppnå med å forklare?", "Redusere usikkerhet, skape forutsigbarhet og kontroll, øke mestring, og få innringer til å forstå hva som skjer og hva vedkommende skal gjøre."),
    ("Oppgave 7: Suksesskriterier ved meldingsmottak.", "Riktig lokasjon, riktig hendelsesforståelse, tidskritisk informasjon, fare/utvikling, hvem er truet/skadet, riktig ressurs/varsling, ro og tydelig veiledning."),
    ("Oppgave 8: Hva betyr det å parafrasere?", "Gjenta med egne ord for å sjekke forståelsen, vise lytting og korrigere misforståelser."),
    ("Oppgave 10: Hvilke funksjoner bygger ELS på?", "Innsatsleder, Operasjon, Plan, Logistikk, Administrasjon/økonomi, Informasjon, HMS-koordinator og Liaison."),
    ("Oppgave 11: Nevn minst 3 forankringsfeller.", "Første melding, første hypotese om hendelsestype, første stedsforståelse/adresse, første risikovurdering, første ressursvalg eller tidlig merkelapp som «rutinealarm»."),
    ("Oppgave 12: Hva er emosjonell intelligens og fire aspekter?", "Evne til å oppfatte, anvende, forstå og regulere emosjoner hos seg selv og andre."),
    ("Oppgave 13: Flere typer stress.", "Akutt, kronisk, kumulativt/allostatisk, traumatisk, sekundærtraumatisk, moralsk, identifikasjonsstress, beslutningstretthet og utbrenthet."),
    ("Oppgave 14: Inntil 7 kjennetegn på kriser.", "Uventet/akutt, trussel, tidspress, usikkerhet, tap av kontroll, sterke emosjoner og informasjonsmangel/kompleksitet."),
]


sections = []
sections.append(section(1, "Fokus fra eksamensarket",
    ul(focus_items)
    + "<h3>Avkrysningsstrategi</h3>"
    + ul([
        "Les hele påstanden før du velger. Én feil detalj gjør ofte hele alternativet feil.",
        "Skill mellom normalt, alltid og kan. Operativt fag bruker ofte normalt/typisk, fordi situasjoner kan avvike.",
        "Spør: hvem eier, hvem beslutter, hvem forvalter og hvem utfører? Mange feller blander rolle og ansvar.",
        "Ved tallspørsmål: lær 50/100/300/1000 meter, fareklasser, statusmeldinger og sentrale talegrupper.",
        "Ved psykologi: skill mellom hva som hjelper i skarp drift og hva som er bearbeiding etterpå.",
    ])
    + "<h3>Fokusarket transkribert</h3>"
    + ul(focus_transcribed)
))

sections.append(section(2, "Hva mangler for å gjøre dette helt eksamenssikkert?",
    p("Antall spørsmål, om ett eller flere svar kan være riktige, tidsramme og beståttgrense.")
    + p("Lokale/regionalt gjeldende avtaler: hvilke 110-sentraler, IUA, naboregioner og eventuelle grense-/bistandsavtaler dere faktisk skal kunne.")
    + p("Eventuell fasit/øvingsquiz fra lærerne. Den vil avsløre formuleringstypene de bruker i avkrysningsspørsmål.")
    + p("Avklaring om kartkunnskap/intervjuteknikk også kan komme. Her er de ikke prioritert fordi fokusarket styrer dokumentet.")
    + '<div class="status-box"><h3>Status</h3><p>Siden er oppdatert med fokusark, varierte oppgaver, sambandsreglement, Nok og nært, øvelses-/AAR-materiale og avkryssingsquiz.</p></div>'
))

sections.append(section(3, "Organisering av beredskap og Nordred",
    "<h3>Kjerne</h3>"
    + p("Beredskap mot brann, ulykke og akutt forurensning bygger på samvirke mellom kommunale, interkommunale, statlige og private aktører.")
    + p("Nordred er et nordisk redningssamarbeid mellom Danmark, Finland, Island, Norge og Sverige.")
    + p("Formålet er å hindre eller begrense skader på mennesker, eiendom eller miljø ved ulykker eller overhengende fare for ulykker.")
    + p("Avtalen skal gjøre det enklere å gi gjensidig bistand over landegrenser, blant annet med personell, materiell, ledelse, kostnader og praktiske grensehindre.")
    + p("Nordred erstatter ikke nasjonalt ansvar, men supplerer nasjonale og bilaterale ordninger.")
    + ul([
        "<strong>Hva er Nordred?</strong> Nordisk samarbeid for redningstjeneste og operativ bistand over landegrenser.",
        "<strong>Hvilke land er med?</strong> Danmark, Finland, Island, Norge og Sverige.",
        "<strong>Er Nordred en egen nødetat?</strong> Nei. Det er en samarbeidsavtale/rammeverk.",
    ], "qa")
))

sections.append(section(4, "Farlige stoffer, CBRNE og akutt forurensning",
    "<h3>Begrepsskille</h3>"
    + p("<strong>Farlige stoffer:</strong> stoffer som kan medføre fare for liv, helse, miljø eller materielle verdier ved brann, utslipp, reaksjon, giftighet, radioaktivitet mv.")
    + p("<strong>Farlig gods:</strong> farlige stoffer/gjenstander under transport, regulert etter transportregelverk som ADR, RID, IMDG og ICAO-TI. Ikke alt farlig stoff er farlig gods; farlig gods handler om transport.")
    + p("<strong>CBRNE:</strong> Chemical, Biological, Radiological, Nuclear, Explosive. Samlebegrep for kjemiske, biologiske, radiologiske, nukleære og eksplosive farer.")
    + p("<strong>Akutt forurensning:</strong> forurensning av betydning som inntrer plutselig og som ikke er tillatt etter forurensningsloven. Kan gjelde land, sjø, vassdrag og luft, ikke bare olje.")
    + "<h3>Fare-/Kemlernummer og UN-nummer</h3>"
    + ul([
        "<strong>Farenummer:</strong> To eller tre sifre øverst på oransje skilt. Angir faretype. 30 = brannfarlig væske, 33 = meget brannfarlig væske.",
        "<strong>UN-nummer:</strong> Fire sifre nederst på oransje skilt. Identifiserer stoffet. 1202 = diesel, 1203 = bensin, 1428 = natrium.",
        "<strong>Gjentatt siffer:</strong> forsterket faretype. <strong>0</strong> etter siffer betyr at ett siffer er nok til å angi faren.",
        "<strong>X foran farenummer:</strong> stoffet reagerer farlig med vann.",
    ])
    + table(["Type", "Initial avstand", "Husk"], [
        ["Faste stoffer", "<strong>50 m</strong>", "Startavstand, justeres etter stoff, mengde, vind, terreng og utvikling."],
        ["Væsker", "<strong>100 m</strong>", "Fra kanten av væskedammen. Vurder avrenning, damper og antennelseskilder."],
        ["Gasser", "<strong>300 m</strong>", "Ved vind over ca. 2 m/s: vifteform med vinden, ca. 60 grader. Ved svak vind: sirkulær faresone."],
        ["Eksplosiver/BLEVE", "<strong>1000 m</strong>", "BLEVE = Boiling Liquid Expanding Vapour Explosion."],
    ])
    + '<div class="callout"><h4>Vindregel</h4><p>Innsatspersonell skal så langt mulig arbeide med vinden i ryggen og mot skadestedet.</p></div>'
    + "<h3>Kystverket, IUA og RVK</h3>"
    + ul([
        "Kystverket har statlig ansvar og fagrolle innen akutt forurensning og oljevern/miljøberedskap.",
        "Kommunene har beredskapsplikt for mindre tilfeller av akutt forurensning som ikke dekkes av privat beredskap.",
        "Alle kommuner deltar i interkommunale utvalg mot akutt forurensning (IUA).",
        "RVK betyr Rådgivning ved kjemikalieuhell. Kystverket kan gi råd direkte eller koble inn kjemikaliebedrift/Giftinformasjonen/ICE-nettverk.",
        "110-operatørens rolle er å identifisere stoff, hente informasjon, varsle/koordinere og støtte skadestedsleder med beslutningsgrunnlag.",
    ])
))

sections.append(section(5, "Innsatsledelse og ELS",
    "<h3>Ansvarsfordeling på skadested</h3>"
    + p("<strong>Politi:</strong> overordnet koordinering ved redningsaksjoner, orden/sikkerhet, evakuering, sperringer, etterforskning og samordning mot øvrige nødetater.")
    + p("<strong>Brann:</strong> brann- og redningsfaglig innsats: slokking, redning, farlige stoffer, teknisk frigjøring og akutt forurensning etter lokale/kommunale roller.")
    + p("<strong>Helse:</strong> medisinsk vurdering, triage, behandling, prioritering og transport av pasienter.")
    + "<h3>Innsatsleder brann og utrykningsleder</h3>"
    + p("<strong>Utrykningsleder:</strong> leder første utrykningsstyrke/vaktlag, gjør første vurdering, iverksetter strakstiltak, gir situasjonsrapport og kan fungere som innsatsleder brann til annen leder overtar.")
    + p("<strong>Innsatsleder brann:</strong> har brannvesenets taktiske/faglige ledelse på skadestedet, setter mål/plan for branninnsatsen, organiserer sektorer, vurderer risiko og ressursbehov og samvirker med politi/helse/andre.")
    + "<h3>7-trinnsmodellen</h3>"
    + ol([
        "Les ulykken og gjør risikovurdering: skadestedsfaktorer, utvikling og risiko.",
        "Finn mulige tiltak: ressursbehov og tidsperspektiv.",
        "Beslutt mål med innsats (MMI) og taktisk plan.",
        "Organiser skadestedet og velg KO/ILKO.",
        "Kommuniser og samvirk.",
        "Skap utholdenhet.",
        "Følg opp: effektkontroll, korrigering og dynamisk plan.",
    ])
    + '<div class="callout"><h4>Skadestedsfaktorer</h4><p>Hva har skjedd, hva kan utvikle seg, hvem/hva er truet, hvilke farer finnes, hvilke ressurser trengs, hvilke begrensninger finnes, og hva er verste troverdige utvikling?</p></div>'
    + "<h3>ELS-funksjonene</h3>"
    + ul([
        "<strong>Innsatsleder:</strong> øverste leder for innsatsorganisasjonen.",
        "<strong>Operasjon:</strong> gjennomfører innsatsen, leder sektorer og følger opp effekt av tiltak.",
        "<strong>Plan:</strong> situasjonsbilde, vurderinger, worst case, innsatsplan og videre planlegging.",
        "<strong>Logistikk:</strong> personell, transport, samband, materiell, forsyning og utholdenhet.",
        "<strong>Administrasjon/økonomi:</strong> økonomi, juridiske forhold, arkiv og administrativ støtte.",
        "<strong>Informasjon:</strong> intern/ekstern informasjon og mediehåndtering.",
        "<strong>HMS-koordinator:</strong> helse, miljø og sikkerhet for innsatspersonell.",
        "<strong>Liaison:</strong> kontaktperson/bindeledd til andre etater eller institusjoner, uten linjeledelse.",
    ])
    + '<div class="callout"><h4>Husk</h4><p>ELS er skalerbart. Ikke alle funksjoner må være bemannet i små hendelser, men funksjonene må ivaretas når behovet oppstår.</p></div>'
))

sections.append(section(6, "Sambandsreglement og talegrupper",
    ul([
        "Felles sambandsreglement skal sikre lik bruk av Nødnett, felles prosedyrer og bedre intern/ekstern samhandling.",
        "Politidirektoratet har forvaltningsmessig ansvar for felles sambandsreglement nivå 1.",
        "DSB eier og administrerer nivå 2 for brann- og redningsvesenet.",
        "110-sentralen har ansvar for å implementere sambandsreglementet i egen region og følge opp at det brukes.",
        "Brann- og redningsvesenet skal sikre at brukerne har riktig opplæring og følger reglementet.",
        "Fleetmap beskriver talegrupper en organisasjon har tilgang til og hvordan radioterminaler programmeres.",
    ])
    + "<h3>110-sentralens plikter i Nødnett</h3>"
    + ul([
        "Ha oversikt over, samordne, koordinere og styre sambandstrafikken i egen region.",
        "Definere minst én samtalegruppe for ledelseskommunikasjon, monitorere den og alltid svare på oppkall.",
        "Tildele, inndra, omdisponere og justere talegrupper når forhåndstildelte grupper ikke er tilstrekkelige.",
        "Etablere samband med innsatsstyrken, overordnet vakt og øvrige nødetater, og bistå under innsatsen.",
        "Utalarmere nærmeste egnede ressurs ved fare for liv, helse og store materielle verdier.",
        "Ha lytteplikt på talegrupper for ledelseskommunikasjon og på aktuell samvirketalegruppe når den er besluttet brukt.",
        "Dokumentere nødmeldinger. Nød-/ulykkesmeldinger logges med lyd og skrift, og ledelsestalegrupper lydlogges.",
    ])
    + "<h3>Roller og kallesignaler</h3>"
    + ul([
        "Politiet innehar normalt rollen som innsatsleder for hendelsen. I fravær av politi kan første innsatspersonell fra brann eller øverste brannbefal ivareta rollen til politiet overtar.",
        "IL brann er overordnet vakt fra brann på stedet og ansvarlig for brann- og redningsvesenets håndtering.",
        "Utrykningsleder er leder av en innsatsgruppe brann og ivaretar taktisk samband for brann.",
        "IL brann skal ivareta samband med egen 110-sentral, innsatsleder for hendelsen og IL helse.",
        "x-09: vakthavende brannsjef/stabssjef. x-01: overordnet vakt/IL brann. x-n9: utrykningsleder.",
        "Mannskapsfunksjoner: Alfa = leder, Bravo = NK, Charlie = sjåfør, Delta/Echo/Foxtrot = mannskap.",
    ])
    + table(["Talegruppe", "Bruk", "Eier"], [
        ["NORGE BRANN", "Nasjonale hendelser eller hendelser som trenger koordinering/samordning.", "DSB"],
        ["FARLIG GODS", "Farlig gods-hendelser der fagressurser bør være tilgjengelige.", "DSB"],
        ["OLJEVERN", "Oljevern-/forurensningshendelser der fagressurser bør være tilgjengelige.", "DSB"],
        ["SKOGBRANN 1-30", "Primært ved skogbrann. Skogbrann 1-16 administreres av Alarmsentral Brann Sørvest.", "DSB"],
        ["BRANN HELI", "Arbeidstalegruppe for skogbrannhelikopter.", "DSB"],
        ["BEREDSKAP 1-5", "Kommunikasjon mellom beredskapsaktører når andre felles talegrupper ikke er tilgjengelige/egnet.", "POD"],
        ["FELLES 1-5", "Kommunikasjon mellom Nødnettbrukere når andre felles talegrupper ikke er tilgjengelige/egnet.", "DSB"],
        ["XX-SAR", "Søk og redning.", "HRS"],
        ["XX-BRANN-0", "Hovedtalegruppe for ledelseskommunikasjon og aksjonssamband for 110-sentralen og befal. 110 har lytteplikt.", "DSB"],
        ["XX-BAPS", "Samvirke mellom brann, akuttmedisin og politi.", "POD"],
        ["XX-SAMVUP", "Samvirke mellom helse og beredskapsaktører som også er akutthjelpere. Politiet har ikke tilgang.", "Hdir"],
        ["XX-SAMV", "Samvirke mellom nødetatene og/eller andre beredskapsaktører, men ikke SAR.", "POD"],
        ["XX-SAMV-BRN", "Brannvesenets samvirke med andre aktører.", "DSB"],
        ["XX-INNSATS-X", "Røykdykking i TMO, f.eks. tunneler og innendørsanlegg. Ekstra høy prioritet/bryteprioritet.", "DSB"],
        ["XX-11X", "Samhandling mellom 11x-sentraler.", "DSB"],
        ["NOSE/FINO/EURO", "NOSE Norge-Sverige, FINO Norge-Finland, EURO DMO-samvirke.", "DSB m.fl."],
    ])
    + "<h3>Statusmeldinger</h3>"
    + table(["Kode", "Betydning", "Merk"], [
        ["1", "Rykker ut", "Sendes når brannbilen starter utrykning."],
        ["2", "Fremme", "Ressurs fremme på hendelsesstedet."],
        ["3", "Ikke klar", "Ledig, men ikke full kapasitet. Kan brukes ved tidskritiske hendelser."],
        ["4", "Disp sk. sted", "Fremme på sted, ute på oppdrag, men kan omdisponeres."],
        ["5", "Ledig", "Klar, fullbemannet og tilgjengelig, men ikke på stasjonen."],
        ["6", "Ledig stasjon", "Returnert til stasjonen og klar for nye oppdrag."],
        ["7", "Ute av drift", "Etter avtale, f.eks. service eller ikke normal beredskap."],
        ["8", "Beredskap", "Sideforflyttet beredskap."],
        ["9", "Beredskap stasjon", "I beredskap på stasjonen."],
        ["0", "Disp + x min", "Disponibel, men med økt forspenningstid."],
    ])
    + '<div class="callout"><h4>Klassisk felle</h4><p>Status 3 og 4 blandes ofte. Status 5 er ledig ute, status 6 er ledig på stasjon.</p></div>'
))

sections.append(section(7, "Operativ psykologi: beslutninger og team",
    "<h3>Normativ, deskriptiv, analytisk og intuitiv</h3>"
    + ul([
        "<strong>Normativ modell:</strong> hvordan beslutninger bør tas dersom man er rasjonell, har tid og kan vurdere alternativer systematisk.",
        "<strong>Deskriptiv modell:</strong> hvordan beslutninger faktisk tas i operative situasjoner med tidspress, usikkerhet og risiko.",
        "<strong>Analytisk beslutning:</strong> langsom, bevisst og systematisk vurdering. Passer best ved planlegging/evaluering.",
        "<strong>Intuitiv beslutning:</strong> rask mønstergjenkjenning basert på erfaring og trening. Vanligst i skarp drift, men sårbar for bias.",
        "<strong>RPD/NDM:</strong> gjenkjenne situasjon, velge typisk handling og eventuelt bruke mental simulering.",
    ])
    + "<h3>Situasjonsbevissthet</h3>"
    + ol([
        "<strong>Oppfatte/persepsjon:</strong> oppfatte relevante elementer.",
        "<strong>Forståelse:</strong> sette informasjon sammen til mening.",
        "<strong>Projeksjon/forutse:</strong> forutse utviklingen videre.",
    ])
    + p("Deretter kommer beslutning og handling. Situasjonsbevissthet er ofte individets bilde, mens situasjonsforståelse ofte brukes om det delte/felles bildet i teamet.")
    + "<h3>Beslutningsfeller</h3>"
    + ul([
        "<strong>Bekreftelsesfellen:</strong> søker informasjon som bekrefter første antakelse og overser motstridende tegn.",
        "<strong>Forankringsfellen:</strong> første informasjon/hypotese får for stor vekt.",
        "<strong>Overkonfidens:</strong> for stor tro på egen vurdering.",
        "<strong>Optimismefellen:</strong> undervurderer negativ utvikling.",
        "<strong>Innramming:</strong> måten informasjon presenteres på styrer vurderingen.",
        "<strong>Status quo:</strong> holder fast ved eksisterende løsning selv om situasjonen endrer seg.",
        "<strong>Sunken cost:</strong> fortsetter fordi man allerede har investert ressurser/tid.",
        "<strong>Informasjons-beslutningsfellen:</strong> venter på mer informasjon til handlingsrommet blir mindre.",
    ])
    + "<h3>Risikopersepsjon</h3>"
    + p("Risikopersepsjon er hvordan vi oppfatter og vurderer risiko. Den påvirkes av erfaring, kunnskap, emosjoner, tidligere hendelser, trening og situasjonsbevissthet.")
    + "<h3>Høytytende team</h3>"
    + ul([
        "Felles mål, tydelige roller, gjensidig avhengighet, god kommunikasjon, tillit, psykologisk trygghet, koordinering og felles situasjonsforståelse.",
        "Team jobber integrert og er gjensidig avhengige. En gruppe kan jobbe mer parallelt uten samme koordinering.",
        "Psykologisk trygghet gjør det lettere å melde fra, stille spørsmål og korrigere feil.",
    ])
))

sections.append(section(8, "Operativ psykologi: stress, emosjoner og mennesker i krise",
    "<h3>Emosjoner og emosjonell intelligens</h3>"
    + ul([
        "Emosjoner er integrerte kognitive, fysiologiske og atferdsmessige responser.",
        "De gir informasjon om hva som er viktig, men må tolkes i kontekst.",
        "Emosjoner kan skjerpe oppmerksomhet og handlingsberedskap, men også gi tunnelsyn, impulsivitet og svekket lytting.",
        "<strong>Emosjonell intelligens:</strong> evne til å oppfatte, anvende, forstå og regulere emosjoner.",
    ])
    + "<h3>Mennesker i krise og samtalegrep</h3>"
    + ul([
        "<strong>Kognitive reaksjoner:</strong> tunnelsyn, forvirring, svekket konsentrasjon, hukommelsesvansker, redusert informasjonsbearbeiding og handlingslammelse.",
        "<strong>Emosjonelle reaksjoner:</strong> frykt, panikk, sinne, gråt, nummenhet, skyld og fortvilelse.",
        "<strong>Kroppslige reaksjoner:</strong> rask pust, skjelving, kvalme, svetting, hjertebank og uro.",
        "<strong>Atferdsreaksjoner:</strong> flukt, frys, kamp, repetisjon, roping, stillhet eller ukritisk lydighet.",
        "<strong>Forklare:</strong> skape forståelse, forutsigbarhet, kontroll og mestring, og redusere usikkerhet/stress.",
        "<strong>Parafrasere:</strong> gjenta med egne ord for å kontrollere forståelse, vise lytting og korrigere misforståelser.",
        "<strong>Suksesskriterier i meldingsmottak:</strong> riktig lokasjon, hendelsesforståelse, tidskritisk informasjon, fare/utvikling, hvem som er truet/skadet, riktig ressurs/varsling, ro og tydelig veiledning.",
    ])
    + "<h3>Stress og mestring</h3>"
    + ul([
        "Stress oppstår når kravene oppleves større enn tilgjengelige ressurser.",
        "Moderat aktivering kan øke fokus og prestasjon. For høy aktivering svekker arbeidshukommelse, prioritering og systematisk tenkning.",
        "Typiske utslag er tunnelsyn, redusert lytting, raskere antakelser, dårligere informasjonsbearbeiding og mer bruk av intuisjon/System 1.",
        "<strong>Typer stress:</strong> akutt, kronisk, kumulativt/allostatisk, traumatisk, sekundærtraumatisk, moralsk, identifikasjonsstress, beslutningstretthet og utbrenthet.",
        "<strong>Problemfokusert mestring:</strong> strukturere samtalen, innhente fakta, varsle, prioritere og bruke prosedyre.",
        "<strong>Emosjonsfokusert mestring:</strong> regulere reaksjonen, puste, bruke indre dialog/støtte og sette ord på belastning.",
        "<strong>Unngående mestring:</strong> skyve bort/fornekte. Kan gi kort pause, men er uheldig som hovedstrategi over tid.",
    ])
    + "<h3>Sekundærtraumatisering og belastning i 110</h3>"
    + ul([
        "Sekundærtraumatisering er reaksjoner på å bli eksponert for andres traumatiske opplevelser.",
        "Utbrenthet er gradvis belastning over tid gjennom arbeidspress, lite restitusjon, stress og emosjonell utmattelse.",
        "Akustisk eksponering og live-video kan styrke situasjonsforståelsen, men også øke belastningen.",
        "Mangel på avslutning kan gjøre hendelser vanskeligere å legge fra seg.",
        "Moralsk stress oppstår når det er avstand mellom det man ønsker å få til og det rammene tillater.",
        "Identifikasjonsstress oppstår når hendelsen kommer personlig nært.",
    ])
    + "<h3>Defuse, debrief, kollegastøtte og AAR</h3>"
    + ul([
        "Defuse er gjerne en kort, tidlig avlastningssamtale etter krevende hendelse.",
        "Debrief er en mer strukturert gjennomgang/bearbeiding.",
        "Kollegastøtte handler om støtte fra trente kolleger og systemer som fanger opp belastning.",
        "AAR er en systematisk dialog etter innsats eller øvelse for å lære og forbedre.",
        "AAR-spørsmål: Hva var forventet å skje? Hva skjedde? Hvorfor ble det slik? Hva kan forbedres, og hvordan? Hva kan vi spre videre, og hvordan?",
        "AAR skal fokusere på hva, ikke hvem. Resultat kan sorteres i: fortsette, slutte, begynne.",
    ])
))

sections.append(section(9, "Varierte oppgaver fra bildearket",
    '<div class="status-box"><h3>Transkribert fra varierte oppgaver.jpg</h3><p>Oppgave 9 var ikke synlig på bildet. Resten er gjort om til korte huskesvar som passer avkryssing og repetisjon.</p></div>'
    + ul([f"<strong>{q}</strong> {a}" for q, a in varierte], "qa")
))

mini = [
    ("Farenummer 33 betyr hva?", "Meget brannfarlig væske."),
    ("UN 1203 er?", "Bensin."),
    ("Hva betyr X i X423?", "Reagerer farlig med vann."),
    ("Initial avstand ved gass?", "300 meter som håndregel."),
    ("Hva er BLEVE-avstand som håndregel?", "1000 meter."),
    ("Hva er hovedforskjellen på farlig stoff og farlig gods?", "Farlig gods er farlig stoff/gjenstand under transport."),
    ("Hva er RPD?", "Recognition-Primed Decision Making: intuitiv mønstergjenkjenning med eventuell mental simulering."),
    ("Hva svekkes ved høyt stress?", "Arbeidshukommelse, systematisk tenkning, lytting og nyansering."),
    ("Hva er beste mottiltak mot bekreftelsesfellen?", "Aktivt søke informasjon som kan avkrefte første hypotese."),
    ("Hva er IUA?", "Interkommunalt utvalg mot akutt forurensning."),
    ("Hvem eier nivå 2 sambandsreglement for brann?", "DSB."),
    ("Hva betyr status 2?", "Fremme på hendelsesstedet."),
    ("Hva er AAR?", "After Action Review: systematisk dialog etter hendelse/øvelse for læring og forbedring."),
]
sections.append(section(10, "Miniquiz", ul([f"<strong>{q}</strong> {a}" for q, a in mini], "qa")))

quiz_section = """
<section id="s11" class="card">
<h2>11. Eksamenstest</h2>
<p>Avkrysningsoppgaver basert på pensum. Velg kategori og start.</p>
<div class="quiz-controls">
  <label>Kategori
    <select id="quiz-category">
      <option value="all">Alle</option>
      <option value="samband">Samband og talegrupper</option>
      <option value="status">Statusmeldinger</option>
      <option value="farlig">Farlige stoffer / CBRNE</option>
      <option value="ledelse">Innsatsledelse / ELS / 7-trinn</option>
      <option value="psyk">Operativ psykologi</option>
      <option value="krise">Mennesker i krise</option>
      <option value="oppgaver">Varierte oppgaver</option>
      <option value="org">Organisering / Nordred</option>
    </select>
  </label>
  <label>Antall
    <select id="quiz-count">
      <option value="10">10</option>
      <option value="20" selected>20</option>
      <option value="40">40</option>
      <option value="0">Alle</option>
    </select>
  </label>
  <label class="checkbox"><input type="checkbox" id="quiz-shuffle" checked /> Stokk rekkefølge</label>
  <label class="checkbox"><input type="checkbox" id="quiz-instant" checked /> Vis svar med en gang</label>
  <button id="quiz-start" class="btn primary">Start test</button>
</div>
<div id="quiz-area"></div>
</section>
"""
sections.append(quiz_section)

sections.append(section(12, "Øvelser og evaluering",
    ul([
        "Brann- og redningsvesenet skal ha årlig øvelsesplan basert på risiko- og sårbarhetsanalyse og beredskapsanalyse.",
        "Øvelser skal variere i type og omfang slik at bestemmende hendelser for organisering, utrustning og bemanning blir øvd over tid.",
        "Brann- og redningsvesenet skal sørge for fellesøvelser med nødmeldesentralen, øvrige nødetater og andre samvirkeaktører.",
        "Nødmeldesentralen skal også utarbeide årlig øvelsesplan og delta i relevante fellesøvelser.",
        "Øvelser skal dokumenteres: hvorfor, hva og hvordan det ble øvd, hvem som deltok, evaluering og hvordan læringspunkter følges opp.",
        "Evaluering etter hendelser skal identifisere læringspunkter og dokumentere hvordan læringen implementeres.",
    ])
))

sections.append(section(13, "Kilder brukt",
    ul([
        "Fokusark: fokus til fredag 08.05.",
        "fokus til fredsg.jpg.",
        "varierte oppgaver.jpg.",
        "KP-012 Kursplan Alarmsentraloperatør, versjon 3.0, 26.08.2024.",
        "OB-003 Opplæringsbok Internopplæring for alarmsentraloperatør, versjon 2.04, 25.03.2026.",
        "Farlige stoffer 110.pptx.",
        "Felles sambandsreglement for Nødnett, versjon 4.1.",
        "Sambandsreglement Alarm 2026.",
        "Sambandsreglement for brann- og redningsvesenet nivå 2, versjon 4, juli 2019.",
        "Nok og nært.pptx.",
        "Øvelsesplanlegging og evaluering.pptx.",
        "Evaluering - AAR - formidler og veilederrollen.docx.",
        "Beslutningstaking, Emosjoner/stress/mestring og Team/samarbeid - studienotater/presentasjoner.",
        "ELS komplett oppsummering i kursmappen.",
    ])
))

html = f"""<!doctype html>
<html lang="nb">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Eksamensoversikt 110 — repetisjon til 8. mai</title>
<link rel="stylesheet" href="style.css" />
</head>
<body>
<header class="topbar">
  <div class="topbar-inner">
    <div class="brand">
      <strong>Eksamensoversikt 110</strong>
      <span class="muted">repetisjon til 8. mai</span>
    </div>
    <div class="topbar-actions">
      <input id="search" type="search" placeholder="Søk i pensum… (Ctrl/⌘+K)" aria-label="Søk" />
      <button id="theme-toggle" class="btn" aria-label="Bytt mørk modus" title="Bytt mørk modus">☾</button>
    </div>
  </div>
  <nav id="topnav" class="topnav" aria-label="Seksjoner"></nav>
</header>

<main class="layout">
  <aside class="sidebar" aria-label="Innhold">
    <div class="progress-card">
      <h3>Quiz-progresjon</h3>
      <div id="progress-bar"><div id="progress-fill"></div></div>
      <p id="progress-text" class="muted">Ingen quiz startet enda.</p>
      <button id="reset-progress" class="btn small">Nullstill</button>
    </div>
    <ol id="toc" class="toc"></ol>
    <div class="sidebar-footer muted small">
      <p>Oppdatert med fokusark, varierte oppgaver, sambandsreglement, farlige stoffer, ELS og operativ psykologi.</p>
    </div>
  </aside>

  <article id="content" class="content">
{"".join(sections)}
  </article>
</main>

<script src="quizdata.js"></script>
<script src="app.js"></script>
</body>
</html>
"""

ROOT.joinpath("index.html").write_text(html, encoding="utf-8")


extra_questions = [
    {
        "id": "ny1", "kategori": "oppgaver",
        "sporsmal": "Hvilke tre nivåer inngår i situasjonsbevissthet?",
        "valg": ["Oppfatte, forstå, forutse/projisere", "Varsle, loggføre, evaluere", "Plan, operasjon, logistikk", "Lytte, betrygge, forklare"],
        "riktig": [0],
        "forklaring": "Endsley-modellen: oppfatte, forstå og forutse/projisere. Deretter kommer beslutning og handling."
    },
    {
        "id": "ny2", "kategori": "oppgaver",
        "sporsmal": "Hva kjennetegner intuitiv beslutningstaking?",
        "valg": ["Rask og erfaringsbasert", "Bygger på mønstergjenkjenning", "Krever alltid full analyse av alle alternativer", "Kan være sårbar for bias"],
        "riktig": [0, 1, 3],
        "forklaring": "Intuitiv beslutningstaking er rask og erfaring-/mønsterbasert, men kan påvirkes av beslutningsfeller."
    },
    {
        "id": "ny3", "kategori": "oppgaver",
        "sporsmal": "Hva er bekreftelsesfellen?",
        "valg": ["Å lete etter informasjon som bekrefter første antakelse", "Å overse informasjon som taler imot hypotesen", "Å alltid vente på full informasjon", "Å bruke riktig prosedyre"],
        "riktig": [0, 1],
        "forklaring": "Bekreftelsesfellen gjør informasjonsinnhentingen skjev."
    },
    {
        "id": "ny4", "kategori": "oppgaver",
        "sporsmal": "Hva kjennetegner et høyytelsesteam?",
        "valg": ["Felles mål", "Tydelige roller", "Psykologisk trygghet", "Alle jobber isolert uten koordinering"],
        "riktig": [0, 1, 2],
        "forklaring": "Høyytelsesteam kjennetegnes av mål, roller, tillit, kommunikasjon, koordinering og felles situasjonsforståelse."
    },
    {
        "id": "ny5", "kategori": "krise",
        "sporsmal": "Hvilke kan være kognitive reaksjoner hos mennesker i krise?",
        "valg": ["Tunnelsyn", "Forvirring", "Svekket konsentrasjon", "Bedre arbeidshukommelse enn normalt"],
        "riktig": [0, 1, 2],
        "forklaring": "Krise kan redusere oppmerksomhet, konsentrasjon, hukommelse og informasjonsbearbeiding."
    },
    {
        "id": "ny6", "kategori": "krise",
        "sporsmal": "Hva ønsker operatøren å oppnå ved å forklare?",
        "valg": ["Forutsigbarhet", "Kontroll og mestring", "Økt usikkerhet", "At innringer forstår hva som skjer og hva han/hun skal gjøre"],
        "riktig": [0, 1, 3],
        "forklaring": "Forklaring skal redusere usikkerhet og gi retning/mestring."
    },
    {
        "id": "ny7", "kategori": "krise",
        "sporsmal": "Hva betyr det å parafrasere?",
        "valg": ["Gjenta med egne ord for å sjekke forståelse", "Overta samtalen og avbryte innringer", "Vise at man lytter", "Korrigere misforståelser"],
        "riktig": [0, 2, 3],
        "forklaring": "Parafrasering er et aktivt lyttegrep."
    },
    {
        "id": "ny8", "kategori": "ledelse",
        "sporsmal": "Hvilke funksjoner bygger ELS på?",
        "valg": ["Innsatsleder, Operasjon, Plan og Logistikk", "Administrasjon/økonomi, Informasjon, HMS-koordinator og Liaison", "Kun politi, brann og helse", "Kun 110-sentralen"],
        "riktig": [0, 1],
        "forklaring": "ELS-funksjonene er Innsatsleder, Operasjon, Plan, Logistikk, Adm/økonomi, Informasjon, HMS og Liaison."
    },
    {
        "id": "ny9", "kategori": "psyk",
        "sporsmal": "Hva kan være forankringsfeller?",
        "valg": ["Første melding", "Første hypotese om hendelsestype", "Første stedsforståelse/adresse", "Bevisst revurdering av ny informasjon"],
        "riktig": [0, 1, 2],
        "forklaring": "Forankring betyr at første informasjon får uforholdsmessig stor vekt."
    },
    {
        "id": "ny10", "kategori": "psyk",
        "sporsmal": "Hvilke fire aspekter inngår i emosjonell intelligens?",
        "valg": ["Oppfatte emosjoner", "Anvende emosjoner", "Forstå emosjoner", "Regulere emosjoner"],
        "riktig": [0, 1, 2, 3],
        "forklaring": "Emosjonell intelligens handler om å oppfatte, anvende, forstå og regulere emosjoner."
    },
    {
        "id": "ny11", "kategori": "psyk",
        "sporsmal": "Hvilke er relevante typer stress i pensum/undervisning?",
        "valg": ["Akutt og kronisk stress", "Sekundærtraumatisk stress", "Moralsk stress og identifikasjonsstress", "Beslutningstretthet og utbrenthet"],
        "riktig": [0, 1, 2, 3],
        "forklaring": "Alle alternativene er relevante begreper for 110-operatørens belastning og mestring."
    },
    {
        "id": "ny12", "kategori": "krise",
        "sporsmal": "Hva kan kjennetegne kriser?",
        "valg": ["Uventet/akutt situasjon", "Tidspress og usikkerhet", "Tap av kontroll og sterke emosjoner", "Alltid full informasjon"],
        "riktig": [0, 1, 2],
        "forklaring": "Kriser preges ofte av akutt trussel, tidspress, usikkerhet, sterke emosjoner og informasjonsmangel."
    },
]

quiz_path = ROOT / "quizdata.js"
quiz_text = quiz_path.read_text(encoding="utf-8")
existing_ids = set(re.findall(r'id:\s*"([^"]+)"|"id":\s*"([^"]+)"', quiz_text))
existing_ids = {left or right for left, right in existing_ids}
new_questions = [q for q in extra_questions if q["id"] not in existing_ids]

if new_questions:
    prefix = quiz_text.rsplit("];", 1)[0].rstrip()
    separator = "\n\n" if prefix.endswith(",") else ",\n\n"
    insert = separator + "  // ============ VARIERTE OPPGAVER / KRISE / ELS ============\n"
    insert += ",\n".join("  " + json.dumps(q, ensure_ascii=False, indent=2).replace("\n", "\n  ") for q in new_questions)
    quiz_path.write_text(prefix + insert + "\n];\n", encoding="utf-8")

print("Generated index.html and appended", len(new_questions), "quiz questions")
