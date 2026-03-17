import { Component } from '@angular/core';
import { GameserviceService } from '../../services/gameservice/gameservice.service';


@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent {

  constructor(public gameservice:GameserviceService) {
  }
}
