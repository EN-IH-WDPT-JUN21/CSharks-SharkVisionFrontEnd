import { User } from "./user.model";


export class Playlist{
    constructor(
        private _playlistId: number, 
        private _user: User,
        private _name: string,
        private _visible: boolean
    ){}

    
    public get visible(): boolean {
        return this._visible;
    }
    public set visible(value: boolean) {
        this._visible = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get user(): User {
        return this._user;
    }
    public set user(value: User) {
        this._user = value;
    }
    public get playlistId(): number {
        return this._playlistId;
    }
    public set playlistId(value: number) {
        this._playlistId = value;
    }
}