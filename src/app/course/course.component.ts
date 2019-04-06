import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll, shareReplay, throttle
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import {createHttpObservable} from '../common/util';
import {Store} from '../common/store.service';
import {interval} from "rxjs/internal/observable/interval";


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

  courseId: number;

  course$: Observable<Course>;

  lessons$: Observable<Lesson[]>;


  @ViewChild('searchInput') input: ElementRef;

  constructor(private route: ActivatedRoute) {


  }

  ngOnInit() {



    this.courseId = this.route.snapshot.params['id'];

    this.course$ = createHttpObservable(`/api/courses/${this.courseId}`);

    this.lessons$ = createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100`)
      .pipe(
        map(res => res["payload"]))
    //forkJoin().subscribe()
    // this.course$ = this.store.selectCourseById(this.courseId);

  }

  //debounceTime:- waiting stream of value to be stabilized
  // delay
  // the delay between  value is less so only
  // latest value and then interval of 400 seconds


  //Throttling-throtlling time
  //reducing number of values in stream but
  //limiting output by limiting values in certain interval using auxillary
  //timer observable


  ngAfterViewInit() {
    this.lessons$=fromEvent<any>(this.input.nativeElement, 'keyup')
     // const searchLessons$ =  fromEvent<any>(this.input.nativeElement, 'keyup')
          .pipe(
              map(event => event.target.value),
              startWith(''),//get all courses initially
              debounceTime(400),
            /*  throttleTime(500)
              */
              //No guarantee that its latest value for throttle time
              distinctUntilChanged(),// no duplicate values
             //switch  map unsubscribe example 2nd observable only take new recent values
              switchMap(search => this.loadLessons(search))
          );

     // const initialLessons$ = this.loadLessons();

    //  this.lessons$ = concat(initialLessons$, searchLessons$);

   }

  loadLessons(search = ''): Observable<Lesson[]> {
      return createHttpObservable(
          `/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
          .pipe(
              map(res => res["payload"])
          );
  }


}











