import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicoPlacaPage } from './pico-placa-page';

describe('PicoPlacaPage', () => {
  let component: PicoPlacaPage;
  let fixture: ComponentFixture<PicoPlacaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PicoPlacaPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PicoPlacaPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
