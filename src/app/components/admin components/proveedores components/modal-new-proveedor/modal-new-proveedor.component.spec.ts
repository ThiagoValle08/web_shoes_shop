import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewProveedorComponent } from './modal-new-proveedor.component';

describe('ModalNewProveedorComponent', () => {
  let component: ModalNewProveedorComponent;
  let fixture: ComponentFixture<ModalNewProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalNewProveedorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNewProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
