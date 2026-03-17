import { Component , Output, EventEmitter} from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { GameserviceService } from '../../services/gameservice/gameservice.service';

@Component({
  selector: 'app-motif',
  standalone: true,
  imports: [TileComponent ],
  templateUrl: './motif.component.html',
  styleUrl: './motif.component.css'
})
export class MotifComponent {

  res=true;

  @Output() handler1= new EventEmitter<boolean>();

  constructor(public gameservice:GameserviceService) {
  }

  addNewItem():void {
    this.handler1.emit(this.res);
  }

  public update():void{
    this.res=this.gameservice.renewmotif();
    this.addNewItem();
  }

}
