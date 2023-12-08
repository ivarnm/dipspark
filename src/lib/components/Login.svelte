<script>
  import Button from "$lib/components/Button.svelte";
  import {writable} from 'svelte/store';

  let Username = '';

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
        const event = new CustomEvent('loginComplete', userdata);
                dispatchEvent(event);

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

</script>
<div class="container">


    <label class="label" for="myInput">Brukernavn</label> <br>
    <input type="text" id="myInput" bind:value={Username} />

  <div on:click={LoginUser} on:keydown={() => {}}> 
    <Button style={{backgroundColor: '#3D405B', color: 'white'}}>
      Login
    </Button>
  </div>
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
    padding: 0 20px; 
    border-radius: 2px;
    border: 2px solid #CCC;
    background: #F4F1DE; 
    margin-bottom: 20px;
  }
  
</style>