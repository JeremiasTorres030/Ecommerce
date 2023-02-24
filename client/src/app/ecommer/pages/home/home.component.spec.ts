import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        CategoryCardComponent,
        ProductCardComponent,
      ],
      imports: [RouterTestingModule],
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
    const component = fixture.componentInstance;
    component.lastVisited.push({
      category: 'test',
      id: 0,
      image: 'test',
      name: 'test',
      price: 0,
      seller: 'test',
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('div.lastVisiteds');
    expect(div).toBeTruthy();
  });

  it('should have a categoriesList variable whith 6 elements', () => {
    const categoriesListValues = [
      {
        categoryName: 'Ropa',
        categoryImg: '../../../assets/icons/clothes-svgrepo-com.svg',
      },
      {
        categoryName: 'Muebles',
        categoryImg: '../../../assets/icons/technology-svgrepo-com.svg',
      },
      {
        categoryName: 'Computacion',
        categoryImg: '../../../assets/icons/computer-svgrepo-com.svg',
      },
      {
        categoryName: 'Deportes',
        categoryImg:
          '../../../assets/icons/sport-recreation-football-activity-ball-svgrepo-com.svg',
      },
      {
        categoryName: 'Electrodomesticos',
        categoryImg: '../../../assets/icons/laundry-svgrepo-com.svg',
      },
      {
        categoryName: 'Instrumentos',
        categoryImg: '../../../assets/icons/guitar-svgrepo-com.svg',
      },
    ];
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.categoriesList).toBeDefined();
    expect(component.categoriesList).toEqual(categoriesListValues);
  });

  it('should render all items from the categoriesList in app-category-card elements', () => {
    const categoriesListValues = [
      'Ropa',
      'Muebles',
      'Computacion',
      'Deportes',
      'Electrodomesticos',
      'Instrumentos',
    ];
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement;
    const categoryCard = compiled.queryAll(By.css('app-category-card'));
    expect(categoryCard.length).toEqual(categoriesListValues.length);
    categoryCard.forEach((element, index) => {
      const childrenHtml: string = element.children[0].nativeElement.innerText;
      expect(childrenHtml).toEqual(categoriesListValues[index]);
    });
  });

  it('should render app-category-card routerLink attribute with the correct category name', () => {
    const categoriesListValues = [
      'Ropa',
      'Muebles',
      'Computacion',
      'Deportes',
      'Electrodomesticos',
      'Instrumentos',
    ];
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement;
    const categoryCard = compiled.queryAll(By.css('app-category-card'));
    categoryCard.forEach((element, index) => {
      const nativeElement: HTMLElement = element.nativeElement;
      const routerLink = nativeElement
        .getAttribute('ng-reflect-router-link')
        ?.split(',');
      expect(routerLink ? routerLink[1] : '').toEqual(
        categoriesListValues[index]
      );
    });
  });
});
