export interface Referencia {
  id?: string;
  imagen: File | string | null;
  nombreReferencia: string;
  tallas: Tallas;
  totalCantidad: number;
  imagenBase64?: string | null;
}

export interface Tallas {
  '35': number;
  '36': number;
  '37': number;
  '38': number;
  '39': number;
  '40': number;
  '41': number;
  '42': number;
  '43': number;
}
