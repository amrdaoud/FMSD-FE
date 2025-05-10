export interface MetaCard {
  role: string;
  components: MetaComponent[];
}

export interface MetaComponent {
  componentName: string;
  cols: number;
  rows: number;
}
