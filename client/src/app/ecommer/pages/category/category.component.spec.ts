import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoryComponent } from './category.component';

describe('CategoryComponent', () => {
  let router: Router;
  let activedRoute: ActivatedRoute;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'category/:categoryName',
            component: CategoryComponent,
          },
        ]),
      ],
    }).compileComponents();
    router = TestBed.inject(Router);
    activedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should be created', () => {
    const fixture = TestBed.createComponent(CategoryComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have a primary div', () => {
    const fixture = TestBed.createComponent(CategoryComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('div.categoryComponent');
    expect(div).toBeTruthy();
  });

  it('should have a title variable', () => {
    const fixture = TestBed.createComponent(CategoryComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect((component.title = '')).toBeDefined();
  });

  it('should render the title variable with the value of url category name', () => {
    const fixture = TestBed.createComponent(CategoryComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    let categoryNameUrl = '';
    activedRoute.params.subscribe(({ categoryName }) => {
      categoryNameUrl = categoryName;
    });
    console.log(categoryNameUrl);
    console.log(component.title);
    expect(component.title).toEqual(categoryNameUrl);
  });
});
