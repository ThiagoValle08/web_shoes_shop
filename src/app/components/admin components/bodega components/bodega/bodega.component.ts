import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Referencia } from '../../../../interfaces/interfaces';
import { AdminInfoService } from '../../../../services/admin-info.service';
import { NewReferenceComponent } from '../new-reference/new-reference.component';
import { VentasComponent } from '../ventas/ventas.component';
import { AddNumberingComponent } from '../add-numbering/add-numbering.component';

@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.component.html',
  styleUrls: ['./bodega.component.css'],
})
export class BodegaComponent {
  references: Referencia[] = [];
  filteredReferences: Referencia[] = [];
  tallas: number[] = [35, 36, 37, 38, 39, 40, 41, 42, 43];
  searchTerm: string = '';
  showLoader: boolean = false;
  loader: boolean = false;

  readonly dialog = inject(MatDialog);

  constructor(
    private adminInfoService: AdminInfoService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.loadReferences();
  }

  loadReferences() {
    this.loader = true;
    this.adminInfoService
      .getReferences()
      .then((references) => {
        this.references = references;
        this.filteredReferences = this.references;
        this.loader = false;
      })
      .catch((error) => {
        console.error('Error al cargar las referencias:', error);
        this.loader = false;
      });
  }

  filterReferences(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredReferences = this.references;
      this.showLoader = false;
    } else {
      this.filteredReferences = this.references.filter((reference) =>
        reference.nombreReferencia
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      );
      if (!this.filteredReferences.length) {
        this.showLoader = true;
      } else {
        this.showLoader = false;
      }
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewReferenceComponent, {
      width: '95vw',
      height: '90vh',
      maxWidth: 'none',
    });

    dialogRef.afterClosed().subscribe(() => {
      // this.references = this.adminInfoService.getReferences();
      this.filteredReferences = this.references;
      this.cdr.detectChanges();
    });
  }

  addNumbering(reference: any) {
    const dialogRef = this.dialog.open(AddNumberingComponent, {
      width: '95vw',
      height: '90vh',
      maxWidth: 'none',
      data: { reference: reference },
    });
  }

  venta(reference: any) {
    const dialogRef = this.dialog.open(VentasComponent, {
      width: '95vw',
      height: '90vh',
      maxWidth: 'none',
      data: { reference: reference },
    });
  }

  getImageUrl(imagen: File | string | null): string | null {
    if (typeof imagen === 'string') {
      return imagen;
    } else if (imagen instanceof File) {
      return URL.createObjectURL(imagen);
    }
    return null;
  }
}
