import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiholeComponentComponent } from './pihole-component.component';

describe('PiholeComponentComponent', () => {
  let component: PiholeComponentComponent;
  let fixture: ComponentFixture<PiholeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PiholeComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PiholeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
