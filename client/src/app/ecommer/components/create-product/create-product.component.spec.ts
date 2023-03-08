import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';

import { CreateProductComponent } from './create-product.component';

describe('CreateProductComponent', () => {
  let snackBar: MatSnackBar;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateProductComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatSnackBarModule,
      ],
    }).compileComponents();
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CreateProductComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have a primary div', () => {
    const fixture = TestBed.createComponent(CreateProductComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('div.createProductComponent');
    expect(div).toBeTruthy();
  });

  it('should have a editForm variable', () => {
    const fixture = TestBed.createComponent(CreateProductComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.editForm).toBeDefined();
  });

  it('should have a product variable', () => {
    const fixture = TestBed.createComponent(CreateProductComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.product).toBeDefined();
  });

  it('should have a productSubmitSuccess variable', () => {
    const fixture = TestBed.createComponent(CreateProductComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.productSubmitSuccess).toBeDefined();
  });

  it('should have a createForm variable', () => {
    const fixture = TestBed.createComponent(CreateProductComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.createForm).toBeDefined();
  });

  it('should have a categories variable', () => {
    const fixture = TestBed.createComponent(CreateProductComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.categories).toBeDefined();
  });

  it('should have a subCategories variable', () => {
    const fixture = TestBed.createComponent(CreateProductComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.subCategories).toBeDefined();
  });

  it('should have a customError variable', () => {
    const fixture = TestBed.createComponent(CreateProductComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.customError).toBeDefined();
  });

  it('should have a customText variable', () => {
    const fixture = TestBed.createComponent(CreateProductComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.customText).toBeDefined();
  });

  it('should have a onChangeFile function', () => {
    const fixture = TestBed.createComponent(CreateProductComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.onChangeFile).toBeDefined();
  });

  it('should have a submitForm function', () => {
    const fixture = TestBed.createComponent(CreateProductComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.submitForm).toBeDefined();
  });

  it('should have and render a form element', () => {
    const fixture = TestBed.createComponent(CreateProductComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('form');
    expect(form).toBeTruthy();
  });

  it('should render the name product input', () => {
    const fixture = TestBed.createComponent(CreateProductComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input.nameInput');
    expect(input).toBeTruthy();
  });

  it('should render the image product input', () => {
    const fixture = TestBed.createComponent(CreateProductComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input.fileInput');
    expect(input).toBeTruthy();
  });

  it('should render the category product input', () => {
    const fixture = TestBed.createComponent(CreateProductComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('select.categoryInput');
    expect(input).toBeTruthy();
  });

  it('should render the sub category product input', () => {
    const fixture = TestBed.createComponent(CreateProductComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('select.subCategoryInput');
    expect(input).toBeTruthy();
  });

  it('should render the price of the product input', () => {
    const fixture = TestBed.createComponent(CreateProductComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input.priceInput');
    expect(input).toBeTruthy();
  });

  it('should render the submit button', () => {
    const fixture = TestBed.createComponent(CreateProductComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button[type="submit"]');
    expect(button).toBeTruthy();
  });

  it('should call submitForm function when the form is submitted', () => {
    const fixture = TestBed.createComponent(CreateProductComponent);
    const component = fixture.componentInstance;
    const spy = spyOn(component, 'submitForm');
    fixture.detectChanges();
    const compiled = fixture.debugElement;
    compiled.query(By.css('form')).triggerEventHandler('ngSubmit');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
