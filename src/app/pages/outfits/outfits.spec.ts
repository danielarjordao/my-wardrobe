import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Outfits } from './outfits';

describe('Outfits', () => {
  let component: Outfits;
  let fixture: ComponentFixture<Outfits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Outfits],
    }).compileComponents();

    fixture = TestBed.createComponent(Outfits);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
