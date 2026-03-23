import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPost } from '../../../core/models';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
})
export class PostCardComponent {
  @Input() post!: IPost;
  @Input() canDelete = false;
  @Output() onDelete = new EventEmitter<number>();
}
