import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderFormCreateComponent } from './tender-form-create.component';

describe('TenderFormCreateComponent', () => {
  let component: TenderFormCreateComponent;
  let fixture: ComponentFixture<TenderFormCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenderFormCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenderFormCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
