import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameserviceService } from '../../services/gameservice/gameservice.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
    username:string;
    fine=false;
    ready=false;
    ngOnInit() {
      this.username=Math.random().toString();
    }

    nb$:Observable<number>;

    onInputChange(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      this.username = inputElement.value;
    }

    constructor(private router: Router,public gameservice:GameserviceService) {
      this.nb$ = this.gameservice.nb$;
    }

    loadBoard1(): void {
      this.fine=this.gameservice.preparegame(this.username,1);
      this.waitforsync();
    }

    loadBoard2(): void {
      this.fine=this.gameservice.preparegame(this.username,2);
      this.waitforsync();
    }

    loadBoard3(): void {
      this.fine=this.gameservice.preparegame(this.username,3);
      this.waitforsync();
    }

    waitforsync():void{
      while(this.fine==false){
      }
      this.router.navigate(['/board']);
    }
  }
