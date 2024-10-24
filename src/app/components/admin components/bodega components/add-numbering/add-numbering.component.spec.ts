import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNumberingComponent } from './add-numbering.component';

describe('AddNumberingComponent', () => {
  let component: AddNumberingComponent;
  let fixture: ComponentFixture<AddNumberingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNumberingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNumberingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
