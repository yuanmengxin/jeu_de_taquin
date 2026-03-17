import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { BoardComponent } from './components/board/board.component';

export const routes: Routes = [
    { path: 'menu', component: UserComponent }, 
    { path: 'board', component: BoardComponent},
    {path: '',
    redirectTo: '/menu', // auto redirect to /aroute
    pathMatch: 'full'
    }
];
