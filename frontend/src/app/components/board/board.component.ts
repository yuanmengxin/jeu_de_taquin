import { Component} from '@angular/core';
import { GridComponent } from '../grid/grid.component';
import { GameserviceService } from '../../services/gameservice/gameservice.service';
import { ScoreComponent } from '../score/score.component';
import { Router} from '@angular/router';
import { MotifComponent } from '../motif/motif.component';
import { ViewChild } from '@angular/core';
import { RankingComponent } from '../ranking/ranking.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [GridComponent, ScoreComponent,MotifComponent,RankingComponent ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  @ViewChild(GridComponent) gridComponent!: GridComponent;

  username=this.gameservice.name;
  type=this.gameservice.mode;
  //type=1;
  endinfo='';
  ok=true;
  in=false;
  ranking=true;
  score:number;
  constructor(private gameservice:GameserviceService,private router: Router) {
    this.score = 0;
  }

  init():void{
    this.in=true;
  }

  update(b:boolean):void{
    if(b==false){
      this.endinfo='end  of the game, your score is '+this.score.toString();
    }
    this.ok=b;
  }


  tomenu():void{
    this.router.navigate(['/menu']);
  }

  twoface():void{
    this.ranking=!this.ranking;
  }
}
