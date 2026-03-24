import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PostService } from "../../../core/services/post.service";
import { AuthService } from "../../../core/services/auth.service";
import { IPost } from "../../../core/models";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  postForm: FormGroup;
  isLoading = false;
  isLoadingList = false;
  activeTab: "all" | "myPosts" = "all";
  allPosts: IPost[] = [];
  myPosts: IPost[] = [];
  currentUserId: number | null = null;

  showDeleteModal = false;
  postIdToDelete: number | null = null;
  likingPostIds = new Set<number>();

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private authService: AuthService,
  ) {
    this.postForm = this.fb.group({
      text: ["", [Validators.required, Validators.maxLength(400)]],
    });
    this.currentUserId = this.authService.getUserId();
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.isLoadingList = true;
    this.postService.getAllPosts().subscribe({
      next: posts => {
        this.allPosts = posts;
        this.isLoadingList = false;
      },
      error: () => (this.isLoadingList = false),
    });

    if (this.currentUserId) {
      this.postService.getMyPosts(this.currentUserId).subscribe({
        next: posts => (this.myPosts = posts),
      });
    }
  }

  get displayedPosts(): IPost[] {
    if (this.activeTab === "all") {
      return this.allPosts.sort((a, b) => {
        if (b.likesCount !== a.likesCount) {
          return b.likesCount - a.likesCount;
        }

        return b.id - a.id;
      });
    }

    return this.myPosts;
  }

  switchTab(tab: "all" | "myPosts"): void {
    this.activeTab = tab;
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      this.isLoading = true;
      this.postService.savePost(this.postForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.postForm.reset();
          this.loadPosts();
        },
        error: () => (this.isLoading = false),
      });
    }
  }

  confirmDelete(id: number): void {
    this.postIdToDelete = id;
    this.showDeleteModal = true;
  }

  handleDelete(): void {
    if (this.postIdToDelete) {
      this.postService.deletePost(this.postIdToDelete).subscribe({
        next: () => {
          this.showDeleteModal = false;
          this.loadPosts();
        },
        error: () => {
          this.showDeleteModal = false;
        },
      });
    }
  }

  toggleLike(postId: number): void {
    const currentPost = this.displayedPosts.find(post => post.id === postId);

    if (!currentPost || this.likingPostIds.has(postId)) {
      return;
    }

    this.likingPostIds.add(postId);

    const likeRequest$ = currentPost.likedByCurrentUser
      ? this.postService.unlikePost(postId)
      : this.postService.likePost(postId);

    likeRequest$.subscribe({
      next: response => {
        this.updatePostInLists(postId, {
          likesCount: response.likesCount,
          likedByCurrentUser: response.likedByCurrentUser,
        });
        this.likingPostIds.delete(postId);
      },
      error: () => {
        this.likingPostIds.delete(postId);
      },
    });
  }

  private updatePostInLists(postId: number, changes: Partial<IPost>): void {
    this.allPosts = this.allPosts.map(post =>
      post.id === postId ? { ...post, ...changes } : post,
    );

    this.myPosts = this.myPosts.map(post =>
      post.id === postId ? { ...post, ...changes } : post,
    );
  }
}
