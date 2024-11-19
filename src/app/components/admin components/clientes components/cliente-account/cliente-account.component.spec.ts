import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteAccountComponent } from './cliente-account.component';

describe('ClienteAccountComponent', () => {
  let component: ClienteAccountComponent;
  let fixture: ComponentFixture<ClienteAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClienteAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
