<script>
  import { formatDate } from "../../utils/dates";
  export let date;
  const formattedDate = formatDate(date);
</script>

<time datetime={date.toISOString()} title={date}>{formattedDate}</time>
