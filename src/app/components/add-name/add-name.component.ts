import { Component, OnInit, NgZone } from '@angular/core';
import { NameService } from 'shared/name.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  show_submit: any; 
  show_edit_submit: any;
  submitted = false;
  showMsg = false;
  message = '';

  ngOnInit() {
    this.loadNames();
    this.addName();
    this.show_submit = true;
    this.show_edit_submit = false;
    this.nameForm = this.formBuilder.group({
      name: ['', Validators.required],
      message: ['', Validators.required]     
    });
  }

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public nameService: NameService,
    private formBuilder: FormBuilder
  ){ }

  addName() {
    this.nameForm = this.fb.group({
      name: [''],
      message: ['']
    })
  }

  get f() { return this.nameForm.controls; }

  submitForm(type) {
    this.submitted = true;
    if (this.nameForm.invalid) {
      this.showMsg = false;
      this.message = '';  
      return;
    } 
    
    if(type == 'add'){
        this.nameService.CreateName(this.nameForm.value).subscribe(res => {
          console.log('Added!', res)
          this.nameArr.push(res);
          this.loadNames();
          this.submitted = false; 
          this.showMsg = true;
          this.message = 'Added successfully!';
        });
    } else if (type == 'update'){
        //var id = this.actRoute.snapshot.paramMap.get('id');
        var id = this.nameForm.value.id;
        this.nameService.UpdateName(id, this.nameForm.value).subscribe(res => {
          this.loadNames();
        });
        this.show_submit = true;
        this.show_edit_submit = false;
        this.submitted = false;
        this.showMsg = true;
        this.message = 'Updated successfully!';    
    }
    this.nameForm.reset();
  }

   // list
  loadNames() {
    return this.nameService.GetNames().subscribe((data: {}) => {
      this.List = data;
    })
  }

    // Delete issue
  deleteName(data){     
    var index = index = this.List.map(x => {return x.name}).indexOf(data.name);
    return this.nameService.DeleteName(data.id).subscribe(res => {
      this.List.splice(index, 1)
      console.log('deleted!')
      this.showMsg = true;
      this.message = 'Deleted successfully!';   
    })
  }

  editName(data){     
    this.nameForm = this.formBuilder.group({
      name: [data.name, Validators.required],
      message: [data.message, Validators.required],
      id: data.id
    })
    this.show_submit = false;
    this.show_edit_submit = true;
    this.showMsg = false;    
  }
}
