import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddAbonoComponent } from './modal-add-abono.component';

describe('ModalAddAbonoComponent', () => {
  let component: ModalAddAbonoComponent;
  let fixture: ComponentFixture<ModalAddAbonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAddAbonoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddAbonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
