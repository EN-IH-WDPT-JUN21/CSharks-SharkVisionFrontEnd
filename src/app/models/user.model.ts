import { Playlist } from "./playlist.model";

export class User {
    constructor(
        private username: string,
        private emailAddress: string,
        private password: string,
        private pictureUrl: string,
        private dateOfBirth: Date,
        private gender: string,
        private playlistId: Playlist[]
    ) { }
}