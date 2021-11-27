import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentafterloginComponent } from './studentafterlogin.component';

describe('StudentafterloginComponent', () => {
  let component: StudentafterloginComponent;
  let fixture: ComponentFixture<StudentafterloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentafterloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentafterloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
