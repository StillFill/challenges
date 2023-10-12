export default class Player {

    private _mark: Mark;

    constructor(mark: Mark) {
        this._mark = mark;
    }

    get mark(): Mark {
        return this._mark;
    }

    set mark(value: Mark) {
        this._mark = value;
    }

}

export type Mark = 'X' | 'O' | '';