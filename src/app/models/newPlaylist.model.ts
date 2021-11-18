export class NewPlaylist{
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

        constructor(
        private _name: string,
        private _visible: boolean) {}   
}