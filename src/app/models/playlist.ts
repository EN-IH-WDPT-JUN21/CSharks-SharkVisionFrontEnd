import { User } from "./user.model";

export class Playlist{
    constructor(
        private playlistId: number, 
        private user: User,
        private name: string,
        private visible: boolean
    ){}
}