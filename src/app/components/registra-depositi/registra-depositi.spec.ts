import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraDepositi } from './registra-depositi';

describe('RegistraDepositi', () => {
  let component: RegistraDepositi;
  let fixture: ComponentFixture<RegistraDepositi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistraDepositi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistraDepositi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
