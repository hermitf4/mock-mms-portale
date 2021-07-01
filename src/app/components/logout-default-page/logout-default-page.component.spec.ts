import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutDefaultPageComponent } from './logout-default-page.component';

describe('LogoutDefaultPageComponent', () => {
  let component: LogoutDefaultPageComponent;
  let fixture: ComponentFixture<LogoutDefaultPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutDefaultPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutDefaultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
