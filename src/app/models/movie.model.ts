export class Movie {
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }
    public get image(): string {
        return this._image;
    }
    public set image(value: string) {
        this._image = value;
    }
    public get resultType(): string {
        return this._resultType;
    }
    public set resultType(value: string) {
        this._resultType = value;
    }
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    
    constructor(
        private _id: string,
        private _resultType: string,
        private _image: string,
        private _title: string,
        private _description: string
    ) {}
}