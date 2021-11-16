export class FoundMovieResponse {
    public get results(): FoundMovieInfo[] {
        return this._results;
    }
    public set results(value: FoundMovieInfo[]) {
        this._results = value;
    }

    constructor(private _results: FoundMovieInfo[]) {

    }
}

interface FoundMovieInfo {
    id:string,
    resultType:string,
    image:string,
    title:string,
    description:string
}