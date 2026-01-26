import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Review } from '../../../shared/models/Review.model';
import { Product } from '../../../shared/models/Product.model';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  products: Product[] = [
    { id: 1, name: 'Pizza Margherita', price: 12.99, stock: 50 },
    { id: 2, name: 'Burger Classic', price: 8.99, stock: 30 },
    { id: 3, name: 'Caesar Salad', price: 7.99, stock: 25 },
    { id: 4, name: 'Pasta Carbonara', price: 10.99, stock: 40 },
    { id: 5, name: 'Fish & Chips', price: 14.99, stock: 20 }
  ];

  reviews: Review[] = [];

  ngOnInit(): void {
    this.loadReviews();
  }

  private loadReviews(): void {
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) {
      this.reviews = JSON.parse(savedReviews);
    } else {
      this.reviews = [
        {
          id: 1,
          username: 'John Doe',
          rating: 5,
          comment: 'Excellent pizza! Best in town.',
          date: new Date('2024-01-15')
        },
        {
          id: 2,
          username: 'Jane Smith',
          rating: 4,
          comment: 'Good burger, but could be bigger.',
          date: new Date('2024-01-14')
        },
        {
          id: 3,
          username: 'Mike Johnson',
          rating: 5,
          comment: 'Fresh and tasty salad!',
          date: new Date('2024-01-13')
        }
      ];
      this.saveReviews();
    }
  }

  private saveReviews(): void {
    localStorage.setItem('reviews', JSON.stringify(this.reviews));
  }

  getProductName(productId: number): string {
    const product = this.products.find(p => p.id === productId);
    return product ? product.name : 'Unknown Product';
  }

  getStars(rating: number): string[] {
    return Array(5).fill(0).map((_, i) => i < rating ? '★' : '☆');
  }
}
