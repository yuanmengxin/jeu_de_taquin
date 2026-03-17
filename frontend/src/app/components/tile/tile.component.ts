import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css'
})
export class TileComponent {

  static icons = [
    "dev/angular.webp",
    "dev/gitlab.webp",
    "dev/java.webp",
    "dev/npm.webp",
    "dev/spring.webp",
    "dev/ts.webp",];

    @Input() iconId : number;

    iconPath? : string;

    ngOnChanges(){
      this.iconPath = TileComponent.icons[this.iconId - 1];
      //this.iconPath = TileComponent.icons[1];
    }
    

}
