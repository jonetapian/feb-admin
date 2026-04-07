import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesCreateComponent } from './sales-create';

describe('SalesCreateComponent', () => {
  let component: SalesCreateComponent;
  let fixture: ComponentFixture<SalesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});