import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraPrelievi } from './registra-prelievi';

describe('RegistraPrelievi', () => {
  let component: RegistraPrelievi;
  let fixture: ComponentFixture<RegistraPrelievi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistraPrelievi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistraPrelievi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
