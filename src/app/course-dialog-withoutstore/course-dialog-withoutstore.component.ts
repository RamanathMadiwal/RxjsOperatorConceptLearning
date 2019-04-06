
import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {fromEvent, noop} from 'rxjs';
import {concatMap, distinctUntilChanged, exhaustMap, filter, mergeMap, tap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {Store} from '../common/store.service';
import {CourseDialogComponent} from "../course-dialog/course-dialog.component";
@Component({
  selector: 'course-dialog-withoutstore',
  templateUrl: './course-dialog-withoutstore.component.html',
  styleUrls: ['./course-dialog-withoutstore.component.scss']
})
export class CourseDialogWithoutstoreComponent implements OnInit {
  form: FormGroup;

  course: Course;

  @ViewChild('saveButton') saveButton: ElementRef;

  @ViewChild('searchInput') searchInput: ElementRef;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course,
    private store: Store) {

    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required]
    });

  }

  //concatmap
  //stream a b c
  // stream  map -->10 * I 10 * I 10 * I
  //a10 b10 c10
  //sequencial value a value should be mapped then b stream value


  // ngOnInit() {
  //   this.form.valueChanges.pipe(
  //     filter(() => this.form.valid),
  //     concatMap(changes=>this.saveCourses(changes))).
  //     subscribe(changes=>{
  //     });
  // }


  //mergemap
  //without waiting of previous value not completed
  //http request in parallel


  ngOnInit() {
    this.form.valueChanges.pipe(
      filter(() => this.form.valid),
      mergeMap(changes=>this.saveCourses(changes))).
    subscribe(changes=>{
    });
  }

  saveCourses(changes){
    return fromPromise(fetch(`/api/courses/${this.course.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(changes),
        headers: {
          'content-type': 'application/json'
        }
      }));
  }
   //exhaust map :
  // ignoring extra value whenever
  // current observable is going on
  ngAfterViewInit(){
    fromEvent(this.saveButton.nativeElement,'click')
      .pipe(
        exhaustMap(()=>this.saveCourses(this.form.value))
      ).subscribe();
  }
}
