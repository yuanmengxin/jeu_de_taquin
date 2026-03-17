import { Component, Output, EventEmitter, ViewChild} from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { MotifComponent } from '../motif/motif.component';
import { GameserviceService } from '../../services/gameservice/gameservice.service';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [TileComponent,MotifComponent ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent{

  //pattern : number[][] = [[1, 2, 3, 4], [5, 6, 1, 5], [6, 4, 0, 4], [6, 1, 3, 2]];
  pattern : number[][] =this.gameservice.grid;

  @Output() scoreChange:EventEmitter<any> = new EventEmitter();

  @Output() handler2= new EventEmitter<boolean>();

  iconId1:number;
  iconId2:number;
  NBmotif:number;
  i:number;
  j:number;
  ok=true;

  @ViewChild(MotifComponent) motifComponent!: MotifComponent;

  undoStack: number[][][] = [];
  redoStack: number[][][] = [];

  constructor(private gameservice:GameserviceService) {
  }



  public onTry($event:Event) {
    // Extract the clicked HTML element (we shearch for the "grid-cell" div).
    var cell:Element = $event.currentTarget as Element;

    // Get the coordinates from the HTML data attributes.
    const cellIds:number[] = [Number(cell.getAttribute('data-row')), Number(cell.getAttribute('data-column'))];

    // Get the coordinates of the Blank/Empty tile cell.
    const emptyTileIds:number[] = this.getEmptyTileCoordinates();

    // Try to move the tile.
    // If it can be moved, we increase the score counter.
    this.tryTileMove(cellIds, emptyTileIds);

  }
  
  public getEmptyTileCoordinates() {
    //Get the list of the grid cells.
    const cells:Element[] = Array.from(document.getElementsByClassName("grid-cell"));
    
    for (var cell of cells) {
      // Extract the data-isBlank attribute (true when the cell contains the blank tile), and cast it into a boolean.
      var isBlank:boolean = Boolean(cell.getAttribute('data-isBlank') == "true");

      if (isBlank) {
        // If its the blank tile cell, get the coordinates and return them.
        var cell_ids:number[] = [Number(cell.getAttribute('data-row')), Number(cell.getAttribute('data-column'))];
        return cell_ids;
      }
    }

    // Throw an error if we didn't find the blank/empty tile.
    throw new Error("Can't find the Empty tile");
  }

  public tryTileMove(cellIds:number[], emptyTileIds:number[]) {
    // Check if the the clicked tile can be moved.
    // The clicked tile must be on the same row or column as the empty tile.
    if (cellIds[0] == emptyTileIds[0] || cellIds[1] == emptyTileIds[1]) {
      // We also check that ther're not the same (the player clicked on the empty tile).
      if (cellIds[0] != emptyTileIds[0] || cellIds[1] != emptyTileIds[1]) {
        // So if we're here, the tile can be moved.

        // Save the current state to the undo stack before modifying the grid
        this.undoStack.push(this.copyPattern(this.pattern));
        // Clear the redo stack because we are starting a new branch
        this.redoStack = [];


        // We check if it will be moved horizontally (condition is true : movingDimension = 1) or vertically (condition is false : movingDimension = 0).
        var movingDimension:number = (cellIds[0] == emptyTileIds[0]) ? 1 : 0;
        
        // Get the total move destination and origin (in the moving dimension).
        var toCell:number = cellIds[movingDimension];
        var fromCell:number = emptyTileIds[movingDimension];
        // Get the line on which this move will be done (not in the the moving dimension).
        var onLine:number = emptyTileIds[1 - movingDimension];
        // Choose the move direction of the empty tile on this line (1 if the cell id of the destination is greater, -1 if not).
        var direction = ((toCell - fromCell) > 0) ? 1 : -1;
        
        // Move the empty tile on this line, in this direction, until it reachs the clicked tile.
        var count:number = 0;
        while (fromCell != toCell) {
          if (movingDimension == 1) {
            // Horizontally.
            this.pattern[onLine][fromCell] = this.pattern[onLine][fromCell + direction];
          } else {
            // Vertically.
            this.pattern[fromCell][onLine] = this.pattern[fromCell + direction][onLine];
          }
          // Update the moving tile position, and increment the counter for the score.
          fromCell += direction;
          count++;
        }

        // Finally set the clicked tile empty, and update the score.
        this.pattern[cellIds[0]][cellIds[1]] = 0;
        this.updateScore(count);
        this.motifok();
        
      }
    }
  }

  updateScore(scoreIncrease:number){
    // Emits the score data to the parent.
    this.scoreChange.emit(scoreIncrease);
  }

  motifok():void{
    this.iconId1=this.gameservice.iconId1;
    this.iconId2=this.gameservice.iconId2;
    this.NBmotif=this.gameservice.NBmotif;
    for(this.j=0;this.j<4;this.j++){
      for(this.i=0;this.i<3;this.i++){
        if(this.pattern[this.j][this.i]==this.iconId1){
          if(this.pattern[this.j][this.i+1]==this.iconId2){
            this.NBmotif--;
          }
        }
      }
    }
    if(this.NBmotif==0){
      this.motifComponent.update();
      this.addNewItem();
    }
  }


  update(b:boolean):void{
    this.ok=b;
  }

  addNewItem():void {
    this.handler2.emit(this.ok);
  }

  undo(): void {
    if (this.undoStack.length > 0) {
      // Push the current state onto the redo stack
      this.redoStack.push(this.copyPattern(this.pattern));
      // Restore the last state from the undo stack
      this.pattern = this.undoStack.pop()!;
      this.updateScore(1);
    }
  }

  redo(): void {
    if (this.redoStack.length > 0) {
      // Push the current state onto the undo stack
      this.undoStack.push(this.copyPattern(this.pattern));
      // Restore the last state from the redo stack
      this.pattern = this.redoStack.pop()!;
      this.updateScore(1);
    }
  }

  private copyPattern(pattern: number[][]): number[][] {
    return pattern.map(row => [...row]);
  }

}   
