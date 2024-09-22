<script lang="ts">
  export let title: string;
  export let headers: string[] = [];
  export let columns: string[] = [];
  export let rows: Record<string, any>[] = [];

  const isNumber = (value: any): boolean => {
    return typeof value === 'number';
  };
</script>

<div>
  <h2>{title}</h2>
  <table>
    <thead>
      <tr>
        {#each headers as header, index}
          <th class={isNumber(rows[0]?.[columns[index]]) ? 'number' : ''}>
            {header}
          </th>
        {/each}
    </thead>
    <tbody>
      {#each rows as row}
        <tr>
          {#each columns as column}
            <td class={isNumber(row[column]) ? 'number' : ''}>
              {row[column]}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
    color: var(--neutral-100);
    background-color: var(--neutral-0);
  }

  th, td {
    padding: 10px;
    border-bottom: 1px solid var(--neutral-30);
    text-align: left;
  }

  th {
    background-color: var(--primary-70);
    color: var(--neutral-0);
  }

  tr:nth-child(even) {
    background-color: var(--neutral-10);
  }

  tr:nth-child(odd) {
    background-color: var(--neutral-0);
  }

  td {
    color: var(--neutral-70);
  }

  .number {
    text-align: center;
  }

  h2 {
    margin: 0 0 20px 0;
    font-size: 1.2rem;
  }
</style>
