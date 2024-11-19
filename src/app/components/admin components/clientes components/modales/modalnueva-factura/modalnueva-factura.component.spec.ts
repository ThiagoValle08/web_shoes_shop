import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalnuevaFacturaComponent } from './modalnueva-factura.component';

describe('ModalnuevaFacturaComponent', () => {
  let component: ModalnuevaFacturaComponent;
  let fixture: ComponentFixture<ModalnuevaFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalnuevaFacturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalnuevaFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
