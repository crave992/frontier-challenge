import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCardReplyComponent } from './data-card-reply.component';

describe('DataCardReplyComponent', () => {
  let component: DataCardReplyComponent;
  let fixture: ComponentFixture<DataCardReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataCardReplyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataCardReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
