import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddAbonoClienteComponent } from './modal-add-abono-cliente.component';

describe('ModalAddAbonoClienteComponent', () => {
  let component: ModalAddAbonoClienteComponent;
  let fixture: ComponentFixture<ModalAddAbonoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAddAbonoClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddAbonoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
