import { Component, OnInit } from '@angular/core';
import { NameService } from 'shared/name.service';


@Component({
  selector: 'app-name-list',
  templateUrl: './name-list.component.html',
  styleUrls: ['./name-list.component.css']
})
export class NameListComponent implements OnInit {

  List: any = [];

  ngOnInit() {
    this.loadNames();
  }

  constructor(
    public nameService: NameService
  ){ }

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
       })
    }

}
