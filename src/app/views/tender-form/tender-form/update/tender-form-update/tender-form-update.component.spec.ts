import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderFormUpdateComponent } from './tender-form-update.component';

describe('TenderFormUpdateComponent', () => {
  let component: TenderFormUpdateComponent;
  let fixture: ComponentFixture<TenderFormUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenderFormUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenderFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
