import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, CategoryCardComponent],
    }).compileComponents();
  });

  it('should be created', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const homeComponent = fixture.componentInstance;
    expect(homeComponent).toBeTruthy();
  });

  it('should have a primary div', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('div.homeComponent');
    expect(div).toBeTruthy();
  });

  it('should have a categories div', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('div.categories');
    expect(div).toBeTruthy();
  });

  it('should have a last items visiteds div', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('div.lastVisiteds');
    expect(div).toBeTruthy();
  });

  it('should have a categoriesList variable whith 6 elements', () => {
    const categoriesListValues = [
      'Ropa',
      'Tecnologia',
      'Computacion',
      'Deportes',
      'Electrodomesticos',
      'Instrumentos',
    ];
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.categoriesList).toBeDefined();
    expect(component.categoriesList).toEqual(categoriesListValues);
  });

  it('should render all items from the categoriesList in app-category-card elements', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement;
    const component = fixture.componentInstance;
    const categoriesList = component.categoriesList;
    const categoryCard = compiled.queryAll(By.css('app-category-card'));
    expect(categoryCard.length).toEqual(categoriesList.length);
    categoryCard.forEach((element, index) => {
      const childrenHtml: string = element.children[0].nativeElement.innerHTML;
      expect(childrenHtml).toEqual(categoriesList[index]);
    });
  });
});
