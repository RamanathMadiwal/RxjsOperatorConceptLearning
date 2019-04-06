import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDialogWithoutstoreComponent } from './course-dialog-withoutstore.component';

describe('CourseDialogWithoutstoreComponent', () => {
  let component: CourseDialogWithoutstoreComponent;
  let fixture: ComponentFixture<CourseDialogWithoutstoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDialogWithoutstoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDialogWithoutstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
