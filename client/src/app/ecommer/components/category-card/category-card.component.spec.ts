import { TestBed } from '@angular/core/testing';
import { CategoryCardComponent } from './category-card.component';

describe('categorieCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryCardComponent],
    }).compileComponents();
  });

  it('should be created', () => {
    const fixture = TestBed.createComponent(CategoryCardComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have a primary div', () => {
    const fixture = TestBed.createComponent(CategoryCardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('div.categoryCard');
    expect(div).toBeTruthy();
  });

  it('should have a category variable', () => {
    const fixture = TestBed.createComponent(CategoryCardComponent);
    fixture.detectChanges();
    const compiled = fixture.componentInstance;
    expect(compiled.category).toBeDefined();
  });

  it('should have and render a h1 with the category name', () => {
    const fixture = TestBed.createComponent(CategoryCardComponent);
    const component = fixture.componentInstance;
    const categoryName = (component.category.categoryName = 'Test');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1?.innerHTML).toEqual(categoryName);
  });
});
