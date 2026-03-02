import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WardrobeList } from './wardrobe-list';

describe('WardrobeList', () => {
  let component: WardrobeList;
  let fixture: ComponentFixture<WardrobeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WardrobeList],
    }).compileComponents();

    fixture = TestBed.createComponent(WardrobeList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
