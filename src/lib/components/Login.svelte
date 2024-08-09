<script lang="ts">
  import { SignIn } from "@auth/sveltekit/components"
</script>

<div class="container">
  <div>
    <p>Logg inn for å komme i gang</p>
  </div>
  <SignIn provider="slack">
    <div slot="submitButton" class="signIn">
      <svg xmlns="http://www.w3.org/2000/svg" style="height:36px;width:36px" viewBox="0 0 122.8 122.8">
        <path 
          d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" 
          fill="#e01e5a">
        </path>
        <path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" 
          fill="#36c5f0">
        </path>
        <path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" 
          fill="#2eb67d">
        </path>
        <path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" 
          fill="#ecb22e">
        </path>
      </svg>
      <span>Logg inn med Slack</span>
    </div>
  </SignIn>
</div>

<style>
  .container {
    margin-top: 6rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .signIn {
    /* ref Slack's design guidelines for a large sign-in button (https://api.slack.com/authentication/sign-in-with-slack#design) */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    gap: 12px;
    width: 296px;
    height: 56px;
    font-family: 'Lato', sans-serif;
    font-weight: 600;
    font-size: 18px;
    border-radius: 4px;
    background-color: var(--slack-bg);
    color: var(--neutral-100);
    border: var(--slack-border);
  }

  p {
    color: var(--neutral-70);
  }
</style>