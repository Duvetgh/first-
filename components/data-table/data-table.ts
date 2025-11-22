Component({
  properties: {
    columns: { type: Array, value: [] },
    rows: { type: Array, value: [] },
    title: { type: String, value: '数据表格' }
  },
  methods: {
    onInput(e: any) {
      const { row, key } = e.currentTarget.dataset;
      const value = e.detail.value;
      const rows = [...(this.data.rows as any[])];
      rows[row] = { ...rows[row], [key]: value };
      this.triggerEvent('change', rows);
    },
    onAddRow() {
      const rows = [...(this.data.rows as any[]), {}];
      this.triggerEvent('change', rows);
    },
    onDelete(e: any) {
      const index = e.currentTarget.dataset.index;
      const rows = (this.data.rows as any[]).filter((_, i) => i !== index);
      this.triggerEvent('change', rows);
    }
  }
});
