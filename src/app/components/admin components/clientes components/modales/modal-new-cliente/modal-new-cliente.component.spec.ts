import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewClienteComponent } from './modal-new-cliente.component';

describe('ModalNewClienteComponent', () => {
  let component: ModalNewClienteComponent;
  let fixture: ComponentFixture<ModalNewClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalNewClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNewClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
