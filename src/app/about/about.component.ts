import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  concat,
  fromEvent,
  interval,
  noop,
  observable,
  Observable,
  of,
  timer,
  merge,
  Subject,
  BehaviorSubject,
  AsyncSubject,
  ReplaySubject
} from 'rxjs';
import {delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  ngOnInit() {
    // document.addEventListener('click',evt=>{
    //   console.log(evt);
    //   setTimeout(()=>{
    //     console.log("Finished")
    //     let counter=0;
    //     setInterval(()=>{
    //       console.log(counter);
    //       counter++;
    //     },1000)
    //   },3000)
    // });


    //Declaration of streams
    /*  const interval$=interval(1000);
      //interval$:- Defination of stream
      //Observable become stream only when subscribe method
    const sub1=  interval$.subscribe(val=>console.log("stream 1 for interval"+val));
    const sub2=  interval$.subscribe(val=>console.log("stream 2 for interval"+val));

    setTimeout(()=>
      sub1.unsubscribe(),5000
    )

      const intervalOfTime$=timer(3000,1000);
      //interval$:- Defination of stream
      //Observable become stream only when subscribe method
      intervalOfTime$.subscribe(val=>console.log("stream for timer 1"+val));
      intervalOfTime$.subscribe(val=>console.log("stream  for timer2"+val));


      //src,Event Name
      //Observable of browser event
      const clicks$=fromEvent(document,'click');
      clicks$.subscribe(
          evt=>console.log(evt),
          //Err to recover from error and continue
          err=>console.log(err)),
            ()=>console.log("completed");*/


    //Api call network fetch
    // const http$= createHttpObservable('api/courses');
    //
    // const course$=http$.pipe(
    //   map(res=> Object.values(res['payload']))
    // )
    //  course$.subscribe(
    //    courses=>console.log(courses),
    //    //noop--> no operation
    //    ()=>{},
    //    ()=>console.log('completed')
    //  )


    const source1$ = of('A', 'B', 'C');

    //const source1$ = interval(1000);


    // const source2$ = of(4, 5, 6);
    // const source3$ = of(7, 8, 9);
    // const result$ = concat(source1$, source2$, source3$);
    //concat inner subscribtion of streams
    //source1 should end to start source2
    // result$.subscribe(
    //   val => console.log(val)
    // )


    // const interval1$ = interval(1000);
    // const interval2$ = interval1$.pipe(map(val => 10 * val));
    //
    // const results$ = merge(interval1$, interval2$);
    //
    // results$.subscribe(console.log);

 //Unsubscribtion
    //Example 1
    // const interval3$=interval(1000)
    // const sub= interval3$.subscribe(console.log);
    //
    // setTimeout(()=>
    // sub.unsubscribe(),5000);


    //Example 2
    //network tab has cancelled request
    // const http$= createHttpObservable('api/courses');
    // const subs= http$.subscribe(console.log);
    // setTimeout(()=>
    //   subs.unsubscribe(),0);// 0  cancelled before calling

  }


}





