import { Component, OnInit, NgZone } from '@angular/core';
import { NameService } from 'shared/name.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-name',
  templateUrl: './add-name.component.html',
  styleUrls: ['./add-name.component.css']
})
export class AddNameComponent implements OnInit {
  nameForm: FormGroup;
  nameArr: any = [];

  ngOnInit() {
    this.addName()
  }

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public nameService: NameService
  ){ }

  addName() {
    this.nameForm = this.fb.group({
      name: [''],
      message: ['']
    })
  }

  submitForm() {
    this.nameService.CreateName(this.nameForm.value).subscribe(res => {
      console.log('Added!')
      this.ngZone.run(() => this.router.navigateByUrl('/name-list'))
    });
  }

}
