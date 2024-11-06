import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCuentasPorPagarComponent } from './modal-cuentas-por-pagar.component';

describe('ModalCuentasPorPagarComponent', () => {
  let component: ModalCuentasPorPagarComponent;
  let fixture: ComponentFixture<ModalCuentasPorPagarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCuentasPorPagarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCuentasPorPagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
