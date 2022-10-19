import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRateComponent } from './item-rate.component';

describe('ItemRateComponent', () => {
  let component: ItemRateComponent;
  let fixture: ComponentFixture<ItemRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
