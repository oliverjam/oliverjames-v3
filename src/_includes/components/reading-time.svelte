<script>
  import { getReadingTime } from "../../utils/dates";
  export let content;
  const seconds = getReadingTime(content);
</script>

<time datetime="{seconds}s">{(seconds / 60).toFixed(1)} minutes</time>
