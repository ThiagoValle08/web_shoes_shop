import { Injectable } from '@angular/core';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import { initializeApp, getApp, FirebaseApp } from 'firebase/app';
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

// const firebaseConfig = {
//   apiKey: 'AIzaSyCX2-xvRa10EEkUOt7G3pHb76AAWNmnaxA',
//   authDomain: 'developmentenvironment-d6d05.firebaseapp.com',
//   projectId: 'developmentenvironment-d6d05',
//   storageBucket: 'developmentenvironment-d6d05.firebasestorage.app',
//   messagingSenderId: '384228566350',
//   appId: '1:384228566350:web:9a72980915a4d043ccaa1f',
//   measurementId: 'G-PJMD28TRF2',
// };

let app: FirebaseApp;
try {
  app = getApp();
} catch (error) {
  app = initializeApp(firebaseConfig);
}

const db = getFirestore();

@Injectable({
  providedIn: 'root',
})
export class AdminInfoService {
  newReference: Referencia;
  allReferences: Referencia[] = [];
  sales: Venta[] = [];
  allProveedores: proveedor[] = [];
  allClientes: proveedor[] = [];

  constructor() {
    this.loadProveedoresFromFirebase();
    this.loadClientesFromFirebase();
  }

  async loadClientesFromFirebase(): Promise<void> {
    try {
      const querySnapshot = await getDocs(collection(db, 'clientes'));
      this.allClientes = querySnapshot.docs.map((doc) => {
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
      console.error('Error al cargar los clientes desde Firebase:', error);
    }
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

  async addNewCliente(newCliente: proveedor): Promise<void> {
    try {
      const docRef = await addDoc(collection(db, 'clientes'), newCliente);
      this.allClientes.unshift({ ...newCliente, id: docRef.id });
    } catch (error) {
      console.error('Error al agregar el cliente a Firebase:', error);
    }
  }

  async getProveedores(): Promise<proveedor[]> {
    const querySnapshot = await getDocs(collection(db, 'proveedores'));
    const proveedoresList: proveedor[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as proveedor;
      proveedoresList.push({ ...data, id: doc.id });
    });
    return proveedoresList;
  }

  async getClientes(): Promise<proveedor[]> {
    const querySnapshot = await getDocs(collection(db, 'clientes'));
    const clientesList: proveedor[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as proveedor;
      clientesList.push({ ...data, id: doc.id });
    });
    return clientesList;
  }

  getProveedorByName(nombre: string): proveedor | undefined {
    return this.allProveedores.find((p) => p.nombre === nombre);
  }
  getClienteByName(nombre: string): proveedor | undefined {
    return this.allClientes.find((p) => p.nombre === nombre);
  }

  getNextFacturaId(nombreProveedor: string): number {
    const proveedor = this.allProveedores.find(
      (p) => p.nombre === nombreProveedor
    );
    return proveedor && proveedor.facturas ? proveedor.facturas.length + 1 : 1;
  }
  getNextFacturaClienteId(nombreCliente: string): number {
    const cliente = this.allClientes.find((p) => p.nombre === nombreCliente);
    return cliente && cliente.facturas ? cliente.facturas.length + 1 : 1;
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
      return;
    }

    nuevaFactura.numeroId = this.getNextFacturaId(nombreProveedor);

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

  async agregarFacturaACliente(
    nombreCliente: string,
    nuevaFactura: factura
  ): Promise<void> {
    const cliente = this.allClientes.find(
      (p) => p.nombre.toLocaleLowerCase() === nombreCliente.toLowerCase()
    );
    if (!cliente) {
      console.error('Cliente no encontrado:', nombreCliente);
      return;
    }

    nuevaFactura.numeroId = this.getNextFacturaClienteId(nombreCliente);
    nuevaFactura.estado = nuevaFactura.estado || true;
    nuevaFactura.fecha = nuevaFactura.fecha || new Date().toISOString();
    nuevaFactura.numero = nuevaFactura.numero || '0';
    nuevaFactura.referencia = nuevaFactura.referencia || '';
    nuevaFactura.valor = nuevaFactura.valor || 0;
    nuevaFactura.deuda = nuevaFactura.deuda || nuevaFactura.valor;
    nuevaFactura.abono = nuevaFactura.abono || [];

    if (
      nuevaFactura.numeroId &&
      nuevaFactura.fecha &&
      nuevaFactura.valor !== undefined
    ) {
      cliente.facturas = cliente.facturas
        ? [...cliente.facturas, nuevaFactura]
        : [nuevaFactura];

      try {
        const clienteDoc = doc(db, 'clientes', cliente.id);
        await updateDoc(clienteDoc, { facturas: cliente.facturas });
      } catch (error) {
        console.error('Error al actualizar el cliente en Firebase:', error);
      }
    } else {
      console.error('Factura con datos incompletos, no se puede actualizar.');
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

    factura.abono = factura.abono
      ? [...factura.abono, nuevoAbono]
      : [nuevoAbono];

    factura.deuda -= nuevoAbono.cantidad;

    if (factura.deuda < 0) factura.deuda = 0;

    try {
      const proveedorDoc = doc(db, 'proveedores', proveedor.id);
      await updateDoc(proveedorDoc, { facturas: proveedor.facturas });
    } catch (error) {
      console.error('Error al actualizar el proveedor en Firebase:', error);
    }
  }
  async agregarAbonoClienteFactura(
    nombreCliente: string,
    numeroId: number,
    nuevoAbono: abono
  ): Promise<void> {
    const cliente = this.allClientes.find((p) => p.nombre === nombreCliente);
    if (!cliente) return;

    const factura = cliente.facturas?.find((f) => f.numeroId === numeroId);
    if (!factura) return;

    factura.abono = factura.abono
      ? [...factura.abono, nuevoAbono]
      : [nuevoAbono];

    factura.deuda -= nuevoAbono.cantidad;

    if (factura.deuda < 0) factura.deuda = 0;

    try {
      const proveedorDoc = doc(db, 'clientes', cliente.id);
      await updateDoc(proveedorDoc, { facturas: cliente.facturas });
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
          saleId: data['saleId'],
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

  async addSale(sale: Venta): Promise<void> {
    try {
      await this.loadSalesFromFirebase();

      if (sale.formaPago === 'crédito') {
        let cliente = this.getClienteByName(sale.nombreCliente.toLowerCase());

        if (!cliente) {
          const clientesSnapshot = await getDocs(collection(db, 'clientes'));
          const clientes = clientesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as proveedor[];

          cliente = clientes.find(c =>
            c.nombre.toLowerCase() === sale.nombreCliente.toLowerCase()
          );

          if (!cliente) {
            cliente = {
              nombre: sale.nombreCliente,
              facturas: [],
            } as proveedor;

            await this.addNewCliente(cliente);
          }
        }

        const nuevaFactura: factura = {
          numeroId: this.getNextFacturaClienteId(cliente.nombre), // Usar el cliente encontrado o creado
          estado: false,
          fecha: sale.fecha.toString(),
          numero: sale.saleId,
          referencia: sale.referencia,
          valor: sale.precio,
          deuda: sale.precio,
          abono: [],
        };

        await this.agregarFacturaACliente(cliente.nombre, nuevaFactura);
      }

      // Obtener el siguiente saleId
      const mayorSaleId = this.sales.reduce((max, current) => {
        return Math.max(max, Number(current.saleId));
      }, 0);

      sale.saleId = (mayorSaleId + 1).toString();

      // Agregar la venta a Firebase
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
