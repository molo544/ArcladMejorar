import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDetailsPage } from './alert-details-page';

describe('AlertDetailsPage', () => {
  let component: AlertDetailsPage;
  let fixture: ComponentFixture<AlertDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertDetailsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
