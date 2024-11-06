import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAbonosComponent } from './show-abonos.component';

describe('ShowAbonosComponent', () => {
  let component: ShowAbonosComponent;
  let fixture: ComponentFixture<ShowAbonosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowAbonosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAbonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
