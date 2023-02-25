import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EcommerService } from '../../service/ecommer.service';
import { Categories, Product } from '../../types/types';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  @Input() editForm: boolean = false;
  @Input() product: Product = {
    category: '',
    id: 0,
    image: '',
    name: '',
    price: 0,
    seller: '',
    sub_category: '',
  };
  public createForm = this.fb.group({
    name: ['', [Validators.required]],
    price: [0, [Validators.required]],
    image: [null, [Validators.required]],
    category: ['', [Validators.required]],
    sub_category: ['', [Validators.required]],
    seller: [this.ecommerService.userGet.id, [Validators.required]],
  });

  public categories: Array<Categories> = [
    'Muebles',
    'Computacion',
    'Deportes',
    'Electrodomesticos',
    'Instrumentos',
    'Ropa',
  ];

  public subCategories: Array<string> = [];

  constructor(
    private fb: FormBuilder,
    private ecommerService: EcommerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm.get('category')?.valueChanges.subscribe((value) => {
      this.createForm.get('sub_category')?.setValue('');
      const subCategoryValues: any = {
        Muebles: ['Escritorios', 'Mesas', 'Sillas', 'Camas', 'Estanterias'],
        Computacion: [
          'Mouse',
          'Teclados',
          'Monitores',
          'Auriculares',
          'Computadoras',
        ],
        Deportes: ['Pelotas', 'Pesos', 'Maquinas', 'Bancas', 'Suplementos'],
        Electrodomesticos: [
          'Microondas',
          'Lavarropas',
          'Lavavajillas',
          'Heladeras',
          'Cafeteras',
        ],
        Instrumentos: [
          'Guitarras',
          'Bajos',
          'Baterias',
          'Microfonos',
          'Pianos',
        ],
        Ropa: ['Zapatillas', 'Camisetas', 'Gorras', 'Pantalones', 'Abrigos'],
      };
      if (value) {
        this.subCategories = subCategoryValues[value];
      }
    });

    if (this.editForm) {
      this.createForm.get('name')?.setValue(this.product.name);
      this.createForm.get('category')?.setValue(this.product.category);
      this.createForm.get('sub_category')?.setValue(this.product.sub_category);
      this.createForm.get('price')?.setValue(this.product.price);
      return;
    }
  }

  onChangeFile(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const files = element.files;
    if (files) {
      this.createForm.patchValue({
        image: files[0] as unknown as null,
      });
      this.createForm.get('image')?.updateValueAndValidity();
    }
  }

  submitForm(): void {
    if (this.createForm.valid) {
      const formData = new FormData();
      formData.append('name', this.createForm.get('name')?.value!);
      formData.append(
        'price',
        this.createForm.get('price')?.value?.toString()!
      );
      formData.append('image', this.createForm.get('image')?.value!);
      formData.append('category', this.createForm.get('category')?.value!);

      formData.append(
        'sub_category',
        this.createForm.get('sub_category')?.value!
      );
      formData.append(
        'seller',
        this.createForm.get('seller')?.value?.toString()!
      );

      if (this.editForm) {
        formData.append('id', this.product.id.toString());
        this.ecommerService
          .editProduct(formData as unknown as Product)
          .subscribe({
            next: (res) => {
              console.log(res);
            },
          });

        return;
      }

      this.ecommerService
        .createProduct(formData as unknown as Product)
        .subscribe({
          next: (res) => {
            if (res.ok) {
              this.router.navigateByUrl('');
            }
          },
        });
    }
  }
}
