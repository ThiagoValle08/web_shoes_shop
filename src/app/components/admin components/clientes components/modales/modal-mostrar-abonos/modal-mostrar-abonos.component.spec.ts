import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMostrarAbonosComponent } from './modal-mostrar-abonos.component';

describe('ModalMostrarAbonosComponent', () => {
  let component: ModalMostrarAbonosComponent;
  let fixture: ComponentFixture<ModalMostrarAbonosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalMostrarAbonosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMostrarAbonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
