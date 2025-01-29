import { Component } from '@angular/core';
import { PostService } from './post.service'; // Adjust the import path as per your project structure
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css'],
  standalone: true,
  imports:[FormsModule,CommonModule]
})
export class PostPageComponent {
  isFormVisible: boolean = false;
  message: string = '';
  productId: string = '';
  productDescription: string = '';
  productImage: File | null = null;
  preview: string | null = null;

  constructor(private postService: PostService) {}

  get products() {
    return this.postService.getPosts();
  }

  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
  }

  handleFormSubmit() {
    if (this.productId && this.productDescription && this.productImage) {
      const newPost = {
        id: this.productId,
        description: this.productDescription,
        image: this.preview,
      };

      this.postService.addPost(newPost);
      this.message = 'Post added successfully!';
      this.resetForm();

      setTimeout(() => (this.message = ''), 3000);
      this.isFormVisible = false;
    } else {
      this.message = 'Please fill all the fields!';
      setTimeout(() => (this.message = ''), 3000);
    }
  }

  handleImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.productImage = input.files[0];
      this.preview = URL.createObjectURL(this.productImage);
    } else {
      this.productImage = null;
      this.preview = null;
    }
  }

  resetForm() {
    this.productId = '';
    this.productDescription = '';
    this.productImage = null;
    this.preview = null;
  }
}