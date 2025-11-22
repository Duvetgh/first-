export interface ExperimentTemplateField {
  key: string;
  label: string;
  type: 'string' | 'number';
  required?: boolean;
}

export interface ExperimentTemplate {
  id: string;
  name: string;
  description: string;
  fields: ExperimentTemplateField[];
  defaultChartType: 'bar' | 'line';
}

export const experimentTemplates: ExperimentTemplate[] = [
  {
    id: 'cell_viability',
    name: '细胞活力实验（MTT / CCK-8）',
    description: '输入不同处理组的吸光度值，自动计算平均值与异常点。',
    fields: [
      { key: 'group', label: '组别名称', type: 'string', required: true },
      { key: 'value', label: '测量值（OD）', type: 'number', required: true }
    ],
    defaultChartType: 'bar'
  },
  {
    id: 'qpcr_ct',
    name: 'qPCR Ct 值',
    description: '输入样本 Ct 值，查看分布并定位异常样本。',
    fields: [
      { key: 'sample', label: '样本 ID', type: 'string', required: true },
      { key: 'ct', label: 'Ct 值', type: 'number', required: true }
    ],
    defaultChartType: 'line'
  },
  {
    id: 'elisa',
    name: 'ELISA 实验',
    description: '输入标准曲线和样本吸光度，检查异常点。',
    fields: [
      { key: 'sample', label: '样本/标准品', type: 'string', required: true },
      { key: 'od', label: '吸光度值', type: 'number', required: true }
    ],
    defaultChartType: 'bar'
  },
  {
    id: 'dose_response',
    name: '剂量-反应曲线',
    description: '输入剂量与响应值，绘制曲线并标记异常。',
    fields: [
      { key: 'dose', label: '剂量', type: 'number', required: true },
      { key: 'response', label: '响应值', type: 'number', required: true }
    ],
    defaultChartType: 'line'
  }
];

export const findTemplate = (id?: string) =>
  experimentTemplates.find((tpl) => tpl.id === id);
