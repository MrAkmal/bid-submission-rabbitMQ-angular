import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderUpdateComponent } from './tender-update.component';

describe('TenderUpdateComponent', () => {
  let component: TenderUpdateComponent;
  let fixture: ComponentFixture<TenderUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenderUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenderUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
