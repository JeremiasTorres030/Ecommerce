import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MyProductsComponent } from './my-products.component';

describe('MyProductsComponent', () => {
  let snackBar: MatSnackBar;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyProductsComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
    }).compileComponents();
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(MyProductsComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have a primary div', () => {
    const fixture = TestBed.createComponent(MyProductsComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('div.myProductsComponent');
    expect(div).toBeTruthy();
  });

  it('should have a userProducts variable', () => {
    const fixture = TestBed.createComponent(MyProductsComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.userProducts).toBeDefined();
  });

  it('should have a createForm variable', () => {
    const fixture = TestBed.createComponent(MyProductsComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.createForm).toBeDefined();
  });

  it('should have a editForm variable', () => {
    const fixture = TestBed.createComponent(MyProductsComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.editForm).toBeDefined();
  });

  it('should have a product variable', () => {
    const fixture = TestBed.createComponent(MyProductsComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.product).toBeDefined();
  });

  it('should have a openFormButton function', () => {
    const fixture = TestBed.createComponent(MyProductsComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.openFormButton).toBeDefined();
  });

  it('should have a closeFormButton function', () => {
    const fixture = TestBed.createComponent(MyProductsComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.closeFormButton).toBeDefined();
  });

  it('should have a eventProduct function', () => {
    const fixture = TestBed.createComponent(MyProductsComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.eventProduct).toBeDefined();
  });

  it('should have a editProduct function', () => {
    const fixture = TestBed.createComponent(MyProductsComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.editProduct).toBeDefined();
  });

  it('should have a deleteProduct function', () => {
    const fixture = TestBed.createComponent(MyProductsComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.deleteProduct).toBeDefined();
  });
});
