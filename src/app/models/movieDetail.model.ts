export class MovieDetail {
    public get imDbRating(): string {
        return this._imDbRating;
    }
    public set imDbRating(value: string) {
        this._imDbRating = value;
    }
    public get contentRating(): string {
        return this._contentRating;
    }
    public set contentRating(value: string) {
        this._contentRating = value;
    }
    public get genres(): string {
        return this._genres;
    }
    public set genres(value: string) {
        this._genres = value;
    }
    public get awards(): string {
        return this._awards;
    }
    public set awards(value: string) {
        this._awards = value;
    }
    public get plot(): string {
        return this._plot;
    }
    public set plot(value: string) {
        this._plot = value;
    }
    public get releaseDate(): string {
        return this._releaseDate;
    }
    public set releaseDate(value: string) {
        this._releaseDate = value;
    }
    public get image(): string {
        return this._image;
    }
    public set image(value: string) {
        this._image = value;
    }
    public get year(): string {
        return this._year;
    }
    public set year(value: string) {
        this._year = value;
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

    constructor (
        private _id: string,
        private _fullTitle: string,
        private _year: string,
        private _image: string,
        private _releaseDate: string,
        private _plot: string,
        private _awards: string,
        private _genres: string,
        private _contentRating: string,
        private _imDbRating: string
    ){}
}