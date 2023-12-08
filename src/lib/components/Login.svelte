<script>
  import Button from "$lib/components/Button.svelte";
  import {writable} from 'svelte/store';

  let Username = '';
  let SignupName = '';

  let RegisterUserClicked = false;

  function OnCreateUser() {
    RegisterUserClicked = true;
  }

  async function LoginUser() {
    console.log('Button Clicked!');

    try {
      // Make an asynchronous API call using the fetch function
      const response = await fetch(`https://dipspark-service.azurewebsites.net/Users?username=${Username}`);
      
      // Check if the request was successful (status code 200)
      if (response.ok) {
        const userdata = await response.json();
        console.log('API Response:', userdata);

        localStorage.setItem('loggedInUser', JSON.stringify(userdata));
        // Process the data or update the component state as needed

        console.log('User put to localstorage, reloading..', userdata);
        location.reload(true);
                
      } else {
        console.error('API Error:', response.statusText);
        // Handle error scenarios
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Handle other types of errors, such as network issues
    }
  }

  async function SignUpUser() {
    console.log('Button Clicked!');

    try {

      let user = {
        "name": SignupName,
        "username": Username
      };
      // Make an asynchronous API call using the fetch function
      const response = await fetch(`https://dipspark-service.azurewebsites.net/User`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      });
      
      // Check if the request was successful (status code 200)
      if (response.ok) {


        console.log('User created, reloading..');
        location.reload(true);
                
      } else {
        console.error('API Error:', response.statusText);
        // Handle error scenarios
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Handle other types of errors, such as network issues
    }
  }

</script>
<div class="container">




  <label class="label" for="myInput">Brukernavn</label> <br>
  <input type="text" id="myInput" bind:value={Username} />
  {#if RegisterUserClicked}

    <label class="label" for="myInput">Visningsnavn</label> <br>
    <input type="text" id="SignupNameInput" bind:value={SignupName} />

    <div on:click={SignUpUser} on:keydown={() => {}}> 
      <Button style={{backgroundColor: '#3D405B', color: 'white'}}>
        Registrer deg
      </Button>
    </div>
  {:else}


    <div on:click={LoginUser} on:keydown={() => {}}> 
      <Button style={{backgroundColor: '#3D405B', color: 'white'}}>
        Logg inn
      </Button>
    </div>

    <br>
    <div on:click={OnCreateUser} on:keydown={() => {}}> 
      <Button style={{backgroundColor: '#3D405B', color: 'white'}}>
        Opprett ny bruker
      </Button>
    </div>
  {/if}


  
</div>

<style>
  .container {
    margin: 14px 0;
    width: 100%;
    align-items: center;
  }

  label {
    display: block;
    color: #333;
  }

  input {
    width: 100%;
    font-size: 20px;
    min-height: 53px;
    flex-shrink: 0;
    border-radius: 2px;
    border: 2px solid #CCC;
    background: #F4F1DE; 
    margin-bottom: 20px;
  }
  
</style>