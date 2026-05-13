import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcolaSaldoAttuale } from './calcola-saldo-attuale';

describe('CalcolaSaldoAttuale', () => {
  let component: CalcolaSaldoAttuale;
  let fixture: ComponentFixture<CalcolaSaldoAttuale>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalcolaSaldoAttuale]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalcolaSaldoAttuale);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
