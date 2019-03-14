import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInfoPage } from './item-info.page';

describe('ItemInfoPage', () => {
  let component: ItemInfoPage;
  let fixture: ComponentFixture<ItemInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
