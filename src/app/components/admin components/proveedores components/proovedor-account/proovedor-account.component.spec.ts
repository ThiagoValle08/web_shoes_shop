import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProovedorAccountComponent } from './proovedor-account.component';

describe('ProovedorAccountComponent', () => {
  let component: ProovedorAccountComponent;
  let fixture: ComponentFixture<ProovedorAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProovedorAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProovedorAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
