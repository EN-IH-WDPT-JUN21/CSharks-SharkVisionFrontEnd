import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPlaylistItemComponent } from './user-playlist-item.component';

describe('UserPlaylistItemComponent', () => {
  let component: UserPlaylistItemComponent;
  let fixture: ComponentFixture<UserPlaylistItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPlaylistItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPlaylistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
