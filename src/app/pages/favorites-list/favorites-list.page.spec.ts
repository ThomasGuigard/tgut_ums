import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesListPage } from './favorites-list.page';

describe('FavoritesListPage', () => {
  let component: FavoritesListPage;
  let fixture: ComponentFixture<FavoritesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritesListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
