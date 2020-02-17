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
  List: any = [];
  

  ngOnInit() {
    this.loadNames();
    this.addName();
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
      this.nameArr.push(res);
      this.loadNames();
  
      this.nameForm.reset();
      // this.ngZone.run(() => this.router.navigateByUrl('/name-list'))
    });
  }

   // list
   loadNames() {
    return this.nameService.GetNames().subscribe((data: {}) => {
      this.List = data;
    })
  }

    // Delete issue
    deleteName(data){
      // this.List = this.List.filter(h => h !== hero);
  

      var index = index = this.List.map(x => {return x.name}).indexOf(data.name);
       return this.nameService.DeleteName(data.id).subscribe(res => {
        this.List.splice(index, 1)
         console.log('deleted!')
  
       })
    }

}
