import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderViewComponent } from './tender-view.component';

describe('TenderViewComponent', () => {
  let component: TenderViewComponent;
  let fixture: ComponentFixture<TenderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenderViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
