import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertiInFiat } from './converti-in-fiat';

describe('ConvertiInFiat', () => {
  let component: ConvertiInFiat;
  let fixture: ComponentFixture<ConvertiInFiat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvertiInFiat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertiInFiat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
