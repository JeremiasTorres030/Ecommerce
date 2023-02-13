import { TestBed } from '@angular/core/testing';
import { LongProductCardComponent } from './long-product-card.component';

describe('LongProductCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LongProductCardComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LongProductCardComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have a primary div', () => {
    const fixture = TestBed.createComponent(LongProductCardComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('div.longProductComponent');
    expect(div).toBeTruthy();
  });

  it('should have a product variable', () => {
    const fixture = TestBed.createComponent(LongProductCardComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.product).toBeDefined();
  });
});
