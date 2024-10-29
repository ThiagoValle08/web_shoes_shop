import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Referencia, Tallas } from '../../../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { AdminInfoService } from '../../../../services/admin-info.service';

@Component({
  selector: 'app-new-reference',
  templateUrl: './new-reference.component.html',
  styleUrls: ['./new-reference.component.css'],
})
export class NewReferenceComponent {
  referenciaForm: FormGroup;
  tallas: { talla: number; cantidad: number }[] = [
    { talla: 35, cantidad: 0 },
    { talla: 36, cantidad: 0 },
    { talla: 37, cantidad: 0 },
    { talla: 38, cantidad: 0 },
    { talla: 39, cantidad: 0 },
    { talla: 40, cantidad: 0 },
    { talla: 41, cantidad: 0 },
    { talla: 42, cantidad: 0 },
    { talla: 43, cantidad: 0 },
  ];
  displayedColumns: string[] = ['talla', 'cantidad'];
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private adminInfoService: AdminInfoService,
    private cdr: ChangeDetectorRef
  ) {
    this.referenciaForm = this.fb.group({
      nombreReferencia: ['', Validators.required],
      tallas: this.fb.array(
        this.tallas.map((t) => this.fb.control(t.cantidad, Validators.min(0)))
      ),
      imagen: [null],
      totalCantidad: [0],
    });
  }

  get tallasArray(): FormArray {
    return this.referenciaForm.get('tallas') as FormArray;
  }

  incrementarCantidad(index: number) {
    const control = this.tallasArray.at(index);
    control.setValue(control.value + 1);
    this.actualizarTotal();
  }

  decrementarCantidad(index: number) {
    const control = this.tallasArray.at(index);
    if (control.value > 0) {
      control.setValue(control.value - 1);
      this.actualizarTotal();
    }
  }

  calcularTotal(): number {
    return this.tallasArray.controls.reduce(
      (total, control) => total + control.value,
      0
    );
  }

  actualizarTotal() {
    const total = this.calcularTotal();
    this.referenciaForm.patchValue({ totalCantidad: total });
  }

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      try {
        const resizedImage = await this.resizeImage(file, 800, 800); // Ajusta el tamaño máximo según sea necesario
        this.selectedFile = file;
        this.referenciaForm.patchValue({ imagen: resizedImage });
        this.cdr.detectChanges();
      } catch (error) {
        console.error('Error al redimensionar la imagen:', error);
      }
    } else {
      alert('Por favor, selecciona una imagen válida');
    }
  }

  resizeImage(
    file: File,
    maxWidth: number,
    maxHeight: number
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.7)); // Ajusta la calidad si es necesario
        };
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  async onSubmit() {
    this.actualizarTotal();

    if (this.referenciaForm.valid) {
      const formValue = this.referenciaForm.value;

      const tallas: Tallas = this.tallas.reduce((acc, currentTalla, index) => {
        acc[currentTalla.talla] = formValue.tallas[index];
        return acc;
      }, {} as Tallas);

      const referencia: Referencia = {
        nombreReferencia: formValue.nombreReferencia,
        imagen: formValue.imagen,
        totalCantidad: formValue.totalCantidad,
        tallas: tallas,
      };

      await this.adminInfoService.setNewReference(referencia);
      Swal.fire({
        title: 'Guardado',
        text: 'Se ha guardado la nueva referencia.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
  }
}
