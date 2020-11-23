<script context="module">
  export const data = {
    layout: "layouts/default.svelte",
    title: "Analytics",
  };
</script>

<script>
  export let analytics;
  let total = 0;
  let browsers = new Map();
  let engines = new Map();
  let systems = new Map();

  for (let day of Object.values(analytics)) {
    for (let entry of day) {
      total += 1;
      countKey(entry.browser, browsers);
      countKey(entry.engine, engines);
      countKey(entry.os, systems);
    }
  }
  function countKey(name, map) {
    const existing = map.get(name);
    map.set(name, (existing || 0) + 1);
  }
</script>

<h1>Analytics</h1>
<p>All time</p>
<div>Total: {total}</div>
{#each [...browsers] as [browser, count]}
  <div>{browser}: {count}</div>
{/each}
