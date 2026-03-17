import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { GridComponent } from './components/grid/grid.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,UserComponent, GridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected title = 'Jeu de taquin';
  //user:UserComponent=new UserComponent();
}
