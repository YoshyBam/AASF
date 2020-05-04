import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

//services
import { classService } from 'src/app/services/subscribers/class.service';

//interfaces
import { Class } from 'src/app/models/class.interface';

@Component({
  selector: 'app-add-classes',
  templateUrl: 'add-classes.component.html',
  styleUrls: ['add-classes.component.scss']
})
export class AddClassesComponent implements OnInit, OnDestroy{

  createClassSubscription: Subscription;

  class: Class = {
    id: null,
    name: "",
    schedule: "",
    teacher_id: null
  }

  constructor(private classService: classService, private router: Router) { }

  ngOnInit() {

    this.createClassSubscription = this.classService.createClassSubject.subscribe({
      next: (res) => {
        
        if(isNullOrUndefined(res.error)) {

          console.log(res);
          this.router.navigate(['/classes'])

        } else {

          console.log(res);

        }

      }
    })
  }

  ngOnDestroy() {
    this.createClassSubscription.unsubscribe();
  }

  submit() {
    this.classService.createClass(this.class.name, this.class.schedule);
  }

}
