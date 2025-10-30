import { Component, Input } from '@angular/core';
import { ReviewService } from '../../core/services/review-service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-product-review',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-review.html',
  styleUrl: './product-review.css'
})
export class ProductReview {

  @Input() productImg: string | null = null;
  @Input() productId: string | null = null;
  @Input() reviewLst: any[] = [];
  @Input() rating: number = 0;
  allReviews: any;
  userId: string = '';

  reviewForm = {
    rating: 0,
    comment: ''
  };

  constructor(private reviewService: ReviewService, private _authService: Auth) { }
  ngOnInit(): void {
    this.userId = this._authService.getUserId();
  }



  addReview() {


    const data = {
      rating: Number(this.reviewForm.rating),
      comment: this.reviewForm.comment
    };

    this.reviewService.createReviewandRating(this.productId, data).subscribe({
      next: (data: any) => {
        console.log('Review submitted', data);

        this.reviewForm = { rating: 0, comment: '' };
        this.displayReviews();
      },
      error: (error) => console.log('Error ', error),
    });
  }


  deleteReview() {

    if (!confirm('Are you sure you want to delete your review?')) return;

    this.reviewService.deleteReviewById(this.productId).subscribe({
      next: () => {
        console.log('Review deleted sss');
        this.displayReviews();
      },
      error: (err) => console.error('Error', err)
    });
  }


  editReview() {

    const data = {
      rating: Number(this.reviewForm.rating),
      comment: this.reviewForm.comment
    };

    this.reviewService.updateReviewById(this.productId, data).subscribe({
      next: (data) => {
        console.log('Review updated data for each user sss', data);
        this.reviewForm = { rating: 0, comment: '' };
        this.displayReviews();
      },
      error: (err) => console.error('Error', err)
    });




  }



  displayReviews() {
    this.reviewService.getReviewsByProductId(this.productId).subscribe({
      next: (res: any) => this.reviewLst = res,
      error: (err) => console.log('Error', err)
    });
  }

}
