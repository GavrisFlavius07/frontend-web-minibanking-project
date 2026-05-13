import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertiInCrypto } from './converti-in-crypto';

describe('ConvertiInCrypto', () => {
  let component: ConvertiInCrypto;
  let fixture: ComponentFixture<ConvertiInCrypto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvertiInCrypto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertiInCrypto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
