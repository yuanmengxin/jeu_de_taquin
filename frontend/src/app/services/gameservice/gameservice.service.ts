import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameserviceService {
  name="";
  mode:number;
  //motiflist:number[][]=[[1,6,3],[2,3,2]]
  grid : number[][] =[];
  gridlist:string[]=[];
  rank:string[][];
  motiflist:number[][]=[];
  iconId1=0;
  iconId2=0;
  NBmotif=0;
  index=1;


  private nbSubject = new BehaviorSubject<number>(0); // Reactive subject for 'nb'
  public nb$ = this.nbSubject.asObservable(); // Expose as observable


  constructor(private http: HttpClient) {
  }

public init(){
  this.http
  .get<Array<string>>('api/gridlist')
  .subscribe((returnedData =>{ 
    this.gridlist = returnedData;
    this.nbSubject.next(this.gridlist.length);
  }));
  return true;
}

public preparegame(n:string,m:number):boolean{
  this.http
  .get<Array<Array<number>>>('api/grid')
  .subscribe((returnedData =>{ 
    this.grid = returnedData;
  }));
  this.name=n;
  this.mode=m;
  if(m==1){
    this.http
    .get<Array<Array<number>>>('api/motif1')
    .subscribe(returnedData =>{ 
      this.motiflist = returnedData;
      this.iconId1=this.motiflist[0][0];
      this.iconId2=this.motiflist[0][1];
      this.NBmotif=this.motiflist[0][2];
    })
    this.http
    .get<string[][]>('api/rank1')
    .subscribe(returnedData =>{ 
      this.rank = returnedData;
    })
  }else if(m==2){
    this.http
    .get<Array<Array<number>>>('api/motif2')
    .subscribe(returnedData =>{ 
      this.motiflist = returnedData;
      this.iconId1=this.motiflist[0][0];
      this.iconId2=this.motiflist[0][1];
      this.NBmotif=this.motiflist[0][2];
    })
    this.http
    .get<string[][]>('api/rank2')
    .subscribe(returnedData =>{ 
      this.rank = returnedData;
    })
  }else if(m==3){
    this.http
    .get<Array<Array<number>>>('api/motif3')
    .subscribe(returnedData =>{ 
      this.motiflist = returnedData;
      this.iconId1=this.motiflist[0][0];
      this.iconId2=this.motiflist[0][1];
      this.NBmotif=this.motiflist[0][2];
    })
    this.http
    .get<string[][]>('api/rank3')
    .subscribe(returnedData =>{ 
      this.rank = returnedData;
    })
  }
  return true;
}

public renewmotif():boolean{
  if(this.index>=this.motiflist.length){
    this.iconId1=0;
    this.iconId2=0;
    this.NBmotif=0;
    this.index=1;
    return false;
  }else{
    this.iconId1=this.motiflist[this.index][0];
    this.iconId2=this.motiflist[this.index][1];
    this.NBmotif=this.motiflist[this.index][2];
    this.index=this.index+1;
    return true;
  }
}
}
