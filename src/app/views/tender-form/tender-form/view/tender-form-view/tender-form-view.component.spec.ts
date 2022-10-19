import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderFormViewComponent } from './tender-form-view.component';

describe('TenderFormViewComponent', () => {
  let component: TenderFormViewComponent;
  let fixture: ComponentFixture<TenderFormViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenderFormViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenderFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
