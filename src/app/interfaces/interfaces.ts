export interface Referencia {
  id?: string;
  imagen: File | string | null;
  nombreReferencia: string;
  tallas: Tallas;
  totalCantidad: number;
  imagenBase64?: string | null;
}

export interface Venta {
  fecha: Date;
  id?: string;
  formaPago: string;
  saleId?: string;
  nombreCliente: string;
  precio: number;
  referencia: string;
  tallasVendidas: TallaVendida[];
}

export interface TallaVendida {
  cantidad: number;
  talla: number;
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

export interface proveedor {
  id?: string;
  nombre: string;
  tipo: string;
  facturas?: factura[] | null;
}

export interface factura {
  numeroId: number;
  estado: boolean;
  fecha: string;
  numero: number | string;
  referencia: string;
  valor: number;
  deuda: number;
  abono?: abono[] | null;
}

export interface abono {
  fecha: string | Date;
  cantidad: number;
  nota: string;
}
