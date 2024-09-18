<script lang="ts">
  import {onMount} from "svelte";

  let parkIdLink = '';

  function detectPlatform() {
    const userAgent = navigator.userAgent || (window as any).opera;

    if (/android/i.test(userAgent)) {
      parkIdLink = 'https://play.google.com/store/apps/details?id=com.profectum.parkidmobile';
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      parkIdLink = 'https://apps.apple.com/no/app/parkid/id1146754106';
    } else {
      parkIdLink = 'https://leieparkering.no/MobileApp/Default.aspx';
    }
}

  onMount(() => {
    detectPlatform();
  });
</script>

<section>
  <p>
    DIPS Park er en intern side for ansatte ved DIPS Trondheim for reservasjon av parkeringsplasser.
  </p>
  <p>
    Kontoret disponerer flere parkeringsplasser i B-området (U1) i Solsiden Parkeringshus. 
    Én av parkeringsplassene er fast tildelt en av våre ansatte. Når fast bruker ikke bruker plassen kan øvrige ansatte ved kontoret bruke den.
  </p>

  <h2>Registre bruker</h2>
  <p>
    For å benytte seg av gratis parkering må du først knyttes til DIPS sin parkeringsavtale:
  </p>
  <ol>
    <li>Send din epost til kontorleder</li>
    <li>Kontorleder sørger for å opprette bruker og knytte den til avtale</li>
    <li>Kontorleder oppretter bruker for deg på siden her</li>
    <li>Du mottar en mail når dette er utført</li>
    <li>Last ned appen <a href="{parkIdLink}" target="_blank">ParkID</a> og registrer deg og bilen din</li>
    <li>TIPS: Valider at du blir belastet med 0,- når du begynner å parkere</li>
  </ol>

  <h2>Hvordan fungerer det?</h2>
  <p>
    Biler som kjører inn i P-huset på Solsiden blir automatisk registrert med kameragjenkjenning i systemet easyPay. 
    Er du registrert i internsystemet ParkID sjekkes ditt registreringsnummer mot registrerte data i systemet og 
    får opp at du har en gyldig avtale. Det har ikke noe å si hvor på B-området du parkerer. 
    Parkerer du på et annet område blir du belastet som en "vanlig kunde" og opptar ikke en DIPS-plass.
  </p>
  <p>
    Du kan dermed parkere uten å foreta deg noe mer. Unntaket fra dette er når alle plassene DIPS disponerer allerede er i bruk. 
    Du vil da få et varsel i ParkID-appen at det ikke er noen ledige plasser igjen og du må aktivere en egen parkering som "vanlig kunde". 
  </p>
  <p>
    Merk at appen ParkID kun brukes til å gi varsel dersom alle plassene er opptatt.
    Dersom du parkerer selv om plassene er opptatt må du huske å betale for parkeringen.
    Dette gjøres enten via easyPay sin app, automat, <a href="https://easypay.profectum.no/">easypay.profectum.no</a> (innen 48 timer etter avreise) 
    eller kjør ut og motta faktura i posten. 
    Systemet fungerer slik at det er de første som kommer til plassen som vil bli sluppet inn i avtalen. 
  </p>
</section>

<style>
  section {
    color: var(--neutral-70);
    pointer-events: all;
  }

  h2 {
    margin-top: 1.5em;
  }
</style>
