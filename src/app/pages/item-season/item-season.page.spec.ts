import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSeasonPage } from './item-season.page';

describe('ItemSeasonPage', () => {
  let component: ItemSeasonPage;
  let fixture: ComponentFixture<ItemSeasonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSeasonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSeasonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
