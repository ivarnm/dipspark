<script>
  import Button from "$lib/components/Button.svelte";
  import { GetUsers, GetUser, CreateUser } from '$lib/Api'
  import styles from '$lib/Styles'

  const allowUserRegistration = false;

  let Username = '';
  let SignupName = '';

  let RegisterUserClicked = false;
  let ErrorMessage = null;

  function OnCreateUser() {
    RegisterUserClicked = true;
    ErrorMessage = null;
  }

  function OnBack() {
    RegisterUserClicked = false;
    ErrorMessage = null;
  }

  async function LoginUser() {
    try {
      ErrorMessage = null;
      if (Username.length === 0) {
        ErrorMessage = "Brukernavn kan ikke være tomt"
        return;
      }

      const user = await GetUser(fetch, Username);
      if (user.length === 0) {
        ErrorMessage = "Brukeren eksisterer ikke"
        return;
      }
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      location.reload(true);
    } 
    catch (error) {
      ErrorMessage = "Det skjedde en feil, prøv igjen senere"
    }
  }

  async function SignUpUser() {
    try {
      ErrorMessage = null;

      if (Username.length === 0 || SignupName.length === 0) {
        ErrorMessage = "Brukernavn og visningsnavn må være fylt ut"
        return;
      }

      var users = await GetUsers(fetch);
      if (users.find(u => u.username === Username.toLowerCase())) {
        ErrorMessage = "Brukeren eksisterer allerede"
        return;
      }
      await CreateUser(fetch, SignupName, Username);
      await LoginUser();
    } 
    catch (error) {
      ErrorMessage = "Det skjedde en feil, prøv igjen senere"
    }
  }

</script>
<div class="container">
  <label class="label" for="myInput">Brukernavn</label>
  <input type="text" id="myInput" bind:value={Username} />
  {#if RegisterUserClicked}

    <label class="label" for="myInput">Visningsnavn</label>
    <input type="text" id="SignupNameInput" bind:value={SignupName} />

    <div class="button" on:click={SignUpUser} on:keydown={() => {}}> 
      <Button style={styles.button.primary}>
        Registrer deg
      </Button>
    </div>
    <div class="back">
      <button on:click={OnBack} class="back-button">Tilbake</button>
    </div>
  {:else}
    <div class="button" on:click={LoginUser} on:keydown={() => {}}> 
      <Button style={styles.button.primary}>
        Logg inn
      </Button>
      {#if allowUserRegistration}
        <p style="text-align: center;">eller</p>
      {/if}
    </div>
    {#if allowUserRegistration}
      <div class="button" on:click={OnCreateUser} on:keydown={() => {}}> 
        <Button style={styles.button.primary}>
          Opprett ny bruker
        </Button>
      </div>
    {/if}
  {/if}
  {#if ErrorMessage !== null}
    <p class="error">{ErrorMessage}</p>
  {/if}

</div>

<style>
  .container {
    margin: 14px 0;
    width: 100%;
    /* display: flex;
    flex-direction: column; */
    align-items: center;
  }

  label {
    display: block;
    color: var(--neutral-70);
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    font-size: 20px;
    min-height: 53px;
    flex-shrink: 0;
    border-radius: 2px;
    border: 2px solid var(--neutral-40);
    background: var(--neutral-10); 
    margin-bottom: 20px;
    padding: 0 10px;
    box-sizing: border-box;
    color: var(--neutral-100);
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 50px var(--neutral-10) inset;
    -webkit-text-fill-color: var(--neutral-100);
  }

  p {
    color: var(--neutral-70);
  }

  .button {
    margin-bottom: 1em;
    width: 100%;
  }

  .error {
    color: var(--error);
    margin-top: 10px;
  }

  .back {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .back-button {
    text-align: center;
    text-decoration: underline;
    cursor: pointer;
    border: none;
    outline: none;
    background-color: transparent;
    color: var(--neutral-70);

    &:hover {
      color: var(--neutral-100);
    }
  }
  
</style>