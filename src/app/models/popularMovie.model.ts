export class PopularMovieResponse {
    public get results(): MovieDetailInfo[] {
        return this._results;
    }
    public set results(value: MovieDetailInfo[]) {
        this._results = value;
    }

    constructor(private _results: MovieDetailInfo[]) {

    }
}

interface MovieDetailInfo {
    id:string,
    fullTitle:string,
    image:string,
    imDbRating:string
}