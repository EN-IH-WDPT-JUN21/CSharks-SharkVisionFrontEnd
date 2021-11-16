export class PopularMovie {
    public get imDbRating(): string {
        return this._imDbRating;
    }
    public set imDbRating(value: string) {
        this._imDbRating = value;
    }
    public get image(): string {
        return this._image;
    }
    public set image(value: string) {
        this._image = value;
    }
    public get fullTitle(): string {
        return this._fullTitle;
    }
    public set fullTitle(value: string) {
        this._fullTitle = value;
    }
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    constructor(
        private _id: string,
        private _fullTitle: string,
        private _image: string,
        private _imDbRating: string
    ){}
}
