import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightModeComponent } from './light-mode.component';

describe('LightModeComponent', () => {
  let component: LightModeComponent;
  let fixture: ComponentFixture<LightModeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LightModeComponent]
    });
    fixture = TestBed.createComponent(LightModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
