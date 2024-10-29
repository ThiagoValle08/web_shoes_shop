import { Injectable } from '@angular/core';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { Referencia } from '../interfaces/interfaces';

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
  sales: any[] = [];

  constructor() {}

  async loadSalesFromFirebase(): Promise<void> {
    try {
      const querySnapshot = await getDocs(collection(db, 'sales'));
      this.sales = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    } catch (error) {
      console.error('Error al cargar las ventas desde Firebase:', error);
    }
  }

  async addSale(sale: any): Promise<void> {
    try {
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
