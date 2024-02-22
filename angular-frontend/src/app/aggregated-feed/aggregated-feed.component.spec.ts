import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatedFeedComponent } from './aggregated-feed.component';

describe('AggregatedFeedComponent', () => {
  let component: AggregatedFeedComponent;
  let fixture: ComponentFixture<AggregatedFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggregatedFeedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AggregatedFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
