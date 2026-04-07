import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersCreateComponent } from './suppliers-create';

describe('SuppliersCreateComponent', () => {
  let component: SuppliersCreateComponent;
  let fixture: ComponentFixture<SuppliersCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppliersCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SuppliersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
