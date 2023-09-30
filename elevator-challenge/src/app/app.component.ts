import { Component } from '@angular/core';
import { BehaviorSubject, Subject, concatMap, mergeMap, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  floors = [4, 3, 2, 1];
  floorsQueue: number[] = [];
  onElevatorMove: Subject<number> = new Subject<number>();
  currentFloor = 0;
  selectedFloorToGo = 1;
  elevatorSelectedFloorHeight = 0;
  isMoving = false;

  constructor() {
    this.onElevatorMove.pipe(
      tap((floor) => { this.floorsQueue.push(floor) }),
      concatMap(task => this.handleElevatorGoingToFloor(task)),
    ).subscribe(async () => {
      this.floorsQueue.pop();

      if (this.floorsQueue.length === 0) {
        await this.waitElevatorDelay();
        this.setCurrentFloor(0);
      }
    });
  }

  async handleElevatorGoingToFloor(floor: number) {
    this.setCurrentFloor(floor);

    await this.waitElevatorDelay();

    const selectedFloorToGo = await this.waitAndGetFloorSelection();

    this.setCurrentFloor(selectedFloorToGo);

    await this.waitElevatorDelay();
    
    this.selectedFloorToGo = 1;
  }

  setCurrentFloor(currentFloor: number) {
    this.elevatorSelectedFloorHeight = this.calculateElevatorHeight(currentFloor);
    this.currentFloor = currentFloor;
  }

  calculateElevatorHeight(floor: number): number {

    if (floor === 0) return 0;

    return (floor - 1) * 25;
  }

  async waitElevatorDelay(): Promise<void> {
    this.isMoving = true;
    return new Promise(resolve => {
      setTimeout(() => {
        this.isMoving = false;
        resolve();
      }, 1000);
    });
  }

  async waitAndGetFloorSelection(): Promise<number> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.selectedFloorToGo);
      }, 5000);
    });
  }

  onPressFloorButton(floor: number) {
    this.onElevatorMove.next(floor);
  }

  onPressFloorPanel(floor: number) {
    this.selectedFloorToGo = floor;
  }
}
