import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../../shared/models/Product.model';
import { Review } from '../../../shared/models/Review.model';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent {
  reviewForm: FormGroup;
  
  // Static products data
  products: Product[] = [
    { id: 1, name: 'Pizza Margherita', price: 12.99, stock: 50 },
    { id: 2, name: 'Burger Classic', price: 8.99, stock: 30 },
    { id: 3, name: 'Caesar Salad', price: 7.99, stock: 25 },
    { id: 4, name: 'Pasta Carbonara', price: 10.99, stock: 40 },
    { id: 5, name: 'Fish & Chips', price: 14.99, stock: 20 }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.reviewForm = this.fb.group({
      productId: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(2)]],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      const formValue = this.reviewForm.value;
      
      // Create new review object
      const newReview: Review = {
        id: Date.now(), // Simple unique ID
        username: formValue.username,
        rating: formValue.rating,
        comment: formValue.comment,
        date: new Date()
      };

      // Save to localStorage
      this.saveReview(newReview);
      
      // Navigate back to review list
      this.router.navigate(['/review']);
    } else {
      this.markFormGroupTouched(this.reviewForm);
    }
  }

  private saveReview(review: Review): void {
    const savedReviews = localStorage.getItem('reviews');
    let reviews: Review[] = [];
    
    if (savedReviews) {
      reviews = JSON.parse(savedReviews);
    }
    
    reviews.unshift(review); // Add new review at the beginning
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }

  cancel(): void {
    this.router.navigate(['/review']);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  // Helper for rating display
  getRatingStars(): number[] {
    return [1, 2, 3, 4, 5];
  }
}
