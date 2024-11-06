import { Injectable } from '@angular/core';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { factura, Venta } from '../interfaces/interfaces';
import { abono, proveedor, Referencia } from '../interfaces/interfaces';

const firebaseConfig = {
  apiKey: 'AIzaSyDNuh-qK3SRBwWZQJDqwjqlLVbIuvPJpKU',
  authDomain: 'shoesshop-7a518.firebaseapp.com',
  projectId: 'shoesshop-7a518',
  storageBucket: 'shoesshop-7a518.appspot.com',
  messagingSenderId: '191017210624',
  appId: '1:191017210624:web:d44a20d7e3f97def2219e5',
  measurementId: 'G-F6NHL2XCLZ',
};

initializeApp(firebaseConfig);
const db = getFirestore();

@Injectable({
  providedIn: 'root',
})
export class AdminInfoService {
  newReference: Referencia;
  allReferences: Referencia[] = [];
  sales: Venta[] = [];
  allProveedores: proveedor[] = [];

  constructor() {
    this.loadProveedoresFromFirebase();
  }

  async loadProveedoresFromFirebase(): Promise<void> {
    try {
      const querySnapshot = await getDocs(collection(db, 'proveedores'));
      this.allProveedores = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        const facturas = (data['facturas'] || []).map((factura: any) => ({
          ...factura,
          abono: factura.abono
            ? factura.abono.map((ab: any) => ({
                ...ab,
                fecha:
                  ab.fecha instanceof Timestamp ? ab.fecha.toDate() : ab.fecha,
              }))
            : [],
        }));

        return {
          nombre: data['nombre'] || '',
          tipo: data['tipo'] || '',
          facturas: facturas || null,
          id: doc.id,
        } as proveedor;
      });
    } catch (error) {
      console.error('Error al cargar los proveedores desde Firebase:', error);
    }
  }

  async updateSaleIds(): Promise<void> {
    const querySnapshot = await getDocs(collection(db, 'sales'));
    let saleCounter = 1;

    querySnapshot.docs.forEach(async (doc) => {
      await updateDoc(doc.ref, { saleId: saleCounter.toString() });
      saleCounter++;
    });
  }

  async addNewProveedor(newProveedor: proveedor): Promise<void> {
    try {
      const docRef = await addDoc(collection(db, 'proveedores'), newProveedor);
      this.allProveedores.unshift({ ...newProveedor, id: docRef.id });
    } catch (error) {
      console.error('Error al agregar el proveedor a Firebase:', error);
    }
  }

  async getProveedores(): Promise<proveedor[]> {
    const querySnapshot = await getDocs(collection(db, 'proveedores'));
    const proveedoresList: proveedor[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as proveedor; // Asegúrate de que esto se ajuste a tu estructura
      proveedoresList.push({ ...data, id: doc.id }); // Incluye el id
    });
    return proveedoresList;
  }

  getProveedorByName(nombre: string): proveedor | undefined {
    return this.allProveedores.find((p) => p.nombre === nombre);
  }

  getNextFacturaId(nombreProveedor: string): number {
    const proveedor = this.allProveedores.find(
      (p) => p.nombre === nombreProveedor
    );
    return proveedor && proveedor.facturas ? proveedor.facturas.length + 1 : 1; // Asegúrate de que esto esté correcto
  }

  async agregarFacturaAProveedor(
    nombreProveedor: string,
    nuevaFactura: factura
  ): Promise<void> {
    const proveedor = this.allProveedores.find(
      (p) => p.nombre === nombreProveedor
    );

    if (!proveedor) {
      console.error('Proveedor no encontrado:', nombreProveedor);
      return; // Salir si no se encuentra el proveedor
    }

    nuevaFactura.numeroId = this.getNextFacturaId(nombreProveedor);

    // Asegúrate de que proveedor.facturas esté inicializado
    proveedor.facturas = proveedor.facturas
      ? [...proveedor.facturas, nuevaFactura]
      : [nuevaFactura];

    try {
      const proveedorDoc = doc(db, 'proveedores', proveedor.id);
      await updateDoc(proveedorDoc, { facturas: proveedor.facturas });
    } catch (error) {
      console.error('Error al actualizar el proveedor en Firebase:', error);
    }
  }

  async agregarAbonoAFactura(
    nombreProveedor: string,
    numeroId: number,
    nuevoAbono: abono
  ): Promise<void> {
    const proveedor = this.allProveedores.find(
      (p) => p.nombre === nombreProveedor
    );
    if (!proveedor) return;

    const factura = proveedor.facturas?.find((f) => f.numeroId === numeroId);
    if (!factura) return;

    // Agregar el nuevo abono
    factura.abono = factura.abono
      ? [...factura.abono, nuevoAbono]
      : [nuevoAbono];

    // Actualizar la deuda restando el monto del nuevo abono
    factura.deuda -= nuevoAbono.cantidad;

    // Asegurarse de que la deuda no sea negativa
    if (factura.deuda < 0) factura.deuda = 0;

    // Actualizar el proveedor en Firebase
    try {
      const proveedorDoc = doc(db, 'proveedores', proveedor.id);
      await updateDoc(proveedorDoc, { facturas: proveedor.facturas });
    } catch (error) {
      console.error('Error al actualizar el proveedor en Firebase:', error);
    }
  }

  async loadSalesFromFirebase(): Promise<void> {
    try {
      const querySnapshot = await getDocs(collection(db, 'sales'));
      this.sales = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          saleId: data['saleId'], // Tomando el saleId directamente del campo
          fecha:
            data['fecha'] instanceof Timestamp
              ? data['fecha'].toDate()
              : new Date(data['fecha']),
          formaPago: data['formaPago'] || '',
          nombreCliente: data['nombreCliente'] || '',
          precio: data['precio'] || 0,
          referencia: data['referencia'] || '',
          tallasVendidas: (data['tallasVendidas'] || []).map((talla: any) => ({
            cantidad: talla.cantidad || 0,
            talla: talla.talla || 0,
          })),
        } as Venta;
      });
    } catch (error) {
      console.error('Error al cargar las ventas desde Firebase:', error);
    }
  }

  async addSale(sale: any): Promise<void> {
    try {
      await this.loadSalesFromFirebase();

      const mayorSaleId = this.sales.reduce((max, current) => {
        return Math.max(max, Number(current.saleId));
      }, 0);

      sale.saleId = (mayorSaleId + 1).toString();

      const docRef = await addDoc(collection(db, 'sales'), sale);
      this.sales.unshift({ ...sale, id: docRef.id });
    } catch (error) {
      console.error('Error al agregar la venta a Firebase:', error);
    }
  }

  async getSales(): Promise<any[]> {
    if (this.sales.length === 0) {
      await this.loadSalesFromFirebase();
    }
    return this.sales;
  }

  async loadReferencesFromFirebase(): Promise<void> {
    try {
      const querySnapshot = await getDocs(collection(db, 'references'));
      this.allReferences = querySnapshot.docs.map((doc) => ({
        imagen: doc.data()['imagen'] ?? '',
        nombreReferencia: doc.data()['nombreReferencia'] ?? '',
        tallas: doc.data()['tallas'] ?? [],
        totalCantidad: doc.data()['totalCantidad'] ?? 0,
        id: doc.id,
      }));
    } catch (error) {
      console.error('Error al cargar las referencias desde Firebase:', error);
    }
  }

  async getReferences(): Promise<Referencia[]> {
    if (this.allReferences.length === 0) {
      await this.loadReferencesFromFirebase();
    }
    return this.allReferences;
  }

  async setNewReference(reference: Referencia) {
    try {
      const docRef = await addDoc(collection(db, 'references'), reference);
      this.allReferences.push({ ...reference, id: docRef.id });
    } catch (error) {
      console.error('Error al agregar la referencia a Firebase:', error);
    }
  }

  async updateReference(reference: Referencia) {
    try {
      const referenceDoc = doc(db, 'references', reference.id);
      await updateDoc(referenceDoc, { ...reference });
    } catch (error) {
      console.error('Error al actualizar la referencia en Firebase:', error);
    }
  }
}
