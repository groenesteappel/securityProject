import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedManagerComponent } from './feed-manager.component';

describe('FeedManagerComponent', () => {
  let component: FeedManagerComponent;
  let fixture: ComponentFixture<FeedManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
