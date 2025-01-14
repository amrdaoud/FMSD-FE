export interface Highlight {
    value: string | number | boolean;
    operation: '=' | '<' | '>' | '<=' | '>=' | '<>'
    color?: string;
    backgroundColor?: string;
    altText?: string;
  }