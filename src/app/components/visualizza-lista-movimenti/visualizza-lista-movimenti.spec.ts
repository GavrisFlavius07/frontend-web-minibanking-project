import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizzaListaMovimenti } from './visualizza-lista-movimenti';

describe('VisualizzaListaMovimenti', () => {
  let component: VisualizzaListaMovimenti;
  let fixture: ComponentFixture<VisualizzaListaMovimenti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizzaListaMovimenti]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizzaListaMovimenti);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
