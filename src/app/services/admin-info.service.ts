import { Injectable } from '@angular/core';
import { Referencia } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AdminInfoService {
  newReference: Referencia;
  allReferences: Referencia[] = [];
  sales: any[] = [];

  constructor() {
    if (this.isLocalStorageAvailable()) {
      this.loadReferencesFromLocalStorage();
      this.loadSalesFromLocalStorage();
    }
  }

  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  private saveSalesToLocalStorage() {
    localStorage.setItem('sales', JSON.stringify(this.sales));
  }

  private loadSalesFromLocalStorage() {
    const savedSales = localStorage.getItem('sales');
    if (savedSales) {
      this.sales = JSON.parse(savedSales);
    }
  }

  addSale(sale: any) {
    console.log('servicio', sale);
    this.sales.unshift(sale);
    this.saveSalesToLocalStorage();
  }

  getSales(): any[] {
    return this.sales;
  }

  private saveReferencesToLocalStorage() {
    localStorage.setItem('references', JSON.stringify(this.allReferences));
  }

  private loadReferencesFromLocalStorage() {
    const savedReferences = localStorage.getItem('references');
    if (savedReferences) {
      this.allReferences = JSON.parse(savedReferences);
    }
  }

  setNewReference(reference: Referencia) {
    if (reference.imagen instanceof File) {
      this.convertFileToBase64(reference.imagen).then((base64Image) => {
        reference.imagen = base64Image;
        this.allReferences.push(reference);
        this.saveReferencesToLocalStorage();
      });
    } else {
      this.allReferences.push(reference);
      this.saveReferencesToLocalStorage();
    }
  }

  updateReference(reference: Referencia) {
    const index = this.allReferences.findIndex(
      (ref) => ref.nombreReferencia === reference.nombreReferencia
    );

    if (index !== -1) {
      this.allReferences[index] = reference;
    } else {
      this.allReferences.push(reference);
    }

    if (reference.imagen instanceof File) {
      this.convertFileToBase64(reference.imagen).then((base64Image) => {
        reference.imagen = base64Image;
        this.saveReferencesToLocalStorage();
      });
    } else {
      this.saveReferencesToLocalStorage();
    }
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  getReferences(): Referencia[] {
    return this.allReferences;
  }
}
