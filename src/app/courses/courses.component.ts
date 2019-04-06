import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, finalize, map, retryWhen, shareReplay, tap, filter} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor() {

  }

  ngOnInit() {
    const http$: Observable<Course[]>
      = createHttpObservable('/api/courses');

    const course$ = http$
      .pipe(
        tap(() => console.log(" HTTP request")),
        map(res => Object.values(res['payload'])),
        shareReplay(),
        retryWhen((errors) => {

          return errors.pipe(
            delayWhen(()=>{
              return timer(2000);
              //each time wait two secs for each error
              // stream before retrying

              //delay operator delay whole error stream by total of 2 sec
            })
          )
        }),

        //alternative observable in replacement
        //recovery observable error handling strategy
        //This is not needed when during retrywhen and delaywhen
        catchError(err=> of([
          {
            id: 0,
            description: "RxJs In Practice Course",
            iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png',
            courseListIcon: 'https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png',
            longDescription: "Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples",
            category: 'BEGINNER',
            lessonsCount: 10
          }
          // No continuation
          // return throwError(err);
        ])),
        //As two subscribtion so called twice...
        finalize(()=>{
          console.log("Finalize executed")
        })
      );
      course$.subscribe();
        // This will still be from same
        // stream where stream will be shared
    this.beginnerCourses$ = course$.pipe(map(
      (courses: Course[]) => {
        return courses.filter(course => course.category == 'BEGINNER')
      }
    ));
    this.advancedCourses$ = course$.pipe(map(
      (courses: Course[]) => {
        return courses.filter(course => course.category == 'ADVANCED')
      }
    ));
  }

}
