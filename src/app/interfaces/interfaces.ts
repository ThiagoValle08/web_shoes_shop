export interface Referencia {
  imagen: File | string | null;
  nombreReferencia: string;
  tallas: Tallas;
  totalCantidad: number;
  imagenBase64?: string | null; // Nueva propiedad opcional para Base64
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
