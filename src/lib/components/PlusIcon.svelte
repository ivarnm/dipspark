<script>
  import styles from '$lib/Styles'
  import Button from "$lib/components/Button.svelte";

</script>


<a class="container" href="/book">
  <Button style={{...styles.button.primary, borderRadius: '50%', padding: '0'}}>
    <div class="circle">
      <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M38.5625 19.5C38.5625 20.1067 38.3215 20.6885 37.8925 21.1175C37.4635 21.5465 36.8817 21.7875 36.275 21.7875H21.7875V36.275C21.7875 36.8817 21.5465 37.4635 21.1175 37.8925C20.6885 38.3215 20.1067 38.5625 19.5 38.5625C18.8933 38.5625 18.3115 38.3215 17.8825 37.8925C17.4535 37.4635 17.2125 36.8817 17.2125 36.275V21.7875H2.725C2.11832 21.7875 1.53648 21.5465 1.10749 21.1175C0.678504 20.6885 0.4375 20.1067 0.4375 19.5C0.4375 18.8933 0.678504 18.3115 1.10749 17.8825C1.53648 17.4535 2.11832 17.2125 2.725 17.2125H17.2125V2.725C17.2125 2.11832 17.4535 1.53648 17.8825 1.10749C18.3115 0.678504 18.8933 0.4375 19.5 0.4375C20.1067 0.4375 20.6885 0.678504 21.1175 1.10749C21.5465 1.53648 21.7875 2.11832 21.7875 2.725V17.2125H36.275C36.8817 17.2125 37.4635 17.4535 37.8925 17.8825C38.3215 18.3115 38.5625 18.8933 38.5625 19.5Z" fill="var(--netural-0)"/>
      </svg>
    </div>
  </Button>
</a>

<style>
  .container {
    position: fixed;
    right: 30px;
    bottom: 20px;
  }

  .circle {
    width: 61px;
    height: 61px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
</style>