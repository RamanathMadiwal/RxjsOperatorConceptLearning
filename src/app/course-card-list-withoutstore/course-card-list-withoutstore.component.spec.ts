import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCardListWithoutstoreComponent } from './course-card-list-withoutstore.component';

describe('CourseCardListWithoutstoreComponent', () => {
  let component: CourseCardListWithoutstoreComponent;
  let fixture: ComponentFixture<CourseCardListWithoutstoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseCardListWithoutstoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCardListWithoutstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
