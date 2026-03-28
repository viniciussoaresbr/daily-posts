import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComment, IPost } from '../../../core/models';
import { AuthService } from '../../../core/services/auth.service';
import { PostService } from '../../../core/services/post.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
})
export class PostCardComponent implements OnInit {
  @Input() post!: IPost;
  @Input() canDelete = false;
  @Input() isLiking = false;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onLike = new EventEmitter<number>();

  comments: IComment[] = [];
  newCommentText = '';
  isAddingComment = false;
  currentUserId: number | null = null;

  constructor(
    private postService: PostService,
    private authService: AuthService,
  ) {
    this.currentUserId = this.authService.getUserId();
  }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.postService.getCommentsByPost(this.post.id).subscribe({
      next: comments => {
        this.comments = comments;
      },
    });
  }

  addComment(): void {
    if (!this.newCommentText.trim() || this.isAddingComment) return;

    this.isAddingComment = true;
    this.postService.createComment(this.post.id, this.newCommentText).subscribe({
      next: comment => {
        this.comments.push(comment);
        this.post.commentsCount++;
        this.newCommentText = '';
        this.isAddingComment = false;
      },
      error: () => {
        this.isAddingComment = false;
      },
    });
  }

  deleteComment(commentId: number): void {
    this.postService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments = this.comments.filter(c => c.id !== commentId);
        this.post.commentsCount--;
      },
    });
  }

  canDeleteComment(comment: IComment): boolean {
    return comment.userId === this.currentUserId;
  }
}
