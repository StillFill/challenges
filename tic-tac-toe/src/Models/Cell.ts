import { v4 as uuidv4 } from 'uuid';
import { Mark } from './Player';

export default class Cell {

    public id: string;
    public markedValue: Mark = '';

    constructor() {
        this.id = uuidv4();
    }
}