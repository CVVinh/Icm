
const TableState = reactive({
  tableAttrs: {
    labels: ["年", "償却金額",],
    fields: ["use_on_from", "account_name",],
    clickableColumn: [true],
    columnsWidth: [100, 100, 200, 250],
  } as ColumnAttributes,
  data: [{ application_id: 1, application_kinds: "asdfasdf" }] as HelpdeskInformation[],
  total: 0,
});
</script>
