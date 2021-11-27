import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherafterloginComponent } from './teacherafterlogin.component';

describe('TeacherafterloginComponent', () => {
  let component: TeacherafterloginComponent;
  let fixture: ComponentFixture<TeacherafterloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherafterloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherafterloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
