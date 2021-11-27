import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveQuizComponent } from './give-quiz.component';

describe('GiveQuizComponent', () => {
  let component: GiveQuizComponent;
  let fixture: ComponentFixture<GiveQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiveQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
