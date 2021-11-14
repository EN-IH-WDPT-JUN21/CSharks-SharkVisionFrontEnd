export class MovieDetailResponse {
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
    year:string,
    image:string,
    releaseDate:string,
    plot:string,
    awards:string,
    genres:string,
    contentRating:string,
    imDbRating:string
}