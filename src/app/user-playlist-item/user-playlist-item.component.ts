import { Playlist } from './../models/playlist.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-playlist-item',
  templateUrl: './user-playlist-item.component.html',
  styleUrls: ['./user-playlist-item.component.css']
})
export class UserPlaylistItemComponent implements OnInit {

  @Input() playlist!: Playlist;

  constructor() { }

  ngOnInit(): void {
  }
}