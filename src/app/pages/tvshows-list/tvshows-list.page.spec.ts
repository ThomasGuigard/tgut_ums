import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowsListPage } from './tvshows-list.page';

describe('TvshowsListPage', () => {
  let component: TvshowsListPage;
  let fixture: ComponentFixture<TvshowsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvshowsListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvshowsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
