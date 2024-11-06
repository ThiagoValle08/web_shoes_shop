import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNuevaFacturaComponent } from './modal-nueva-factura.component';

describe('ModalNuevaFacturaComponent', () => {
  let component: ModalNuevaFacturaComponent;
  let fixture: ComponentFixture<ModalNuevaFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalNuevaFacturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNuevaFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
