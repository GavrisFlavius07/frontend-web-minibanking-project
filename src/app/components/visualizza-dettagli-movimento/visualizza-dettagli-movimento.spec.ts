import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizzaDettagliMovimento } from './visualizza-dettagli-movimento';

describe('VisualizzaDettagliMovimento', () => {
  let component: VisualizzaDettagliMovimento;
  let fixture: ComponentFixture<VisualizzaDettagliMovimento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizzaDettagliMovimento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizzaDettagliMovimento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
