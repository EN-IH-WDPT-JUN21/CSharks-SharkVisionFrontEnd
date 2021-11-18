import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomMovieDetailComponent } from './random-movie-detail.component';

describe('RandomMovieDetailComponent', () => {
  let component: RandomMovieDetailComponent;
  let fixture: ComponentFixture<RandomMovieDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomMovieDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomMovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
