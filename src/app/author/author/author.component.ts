import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Author } from '../model/author';
import { AuthorService } from '../service/author.service';
import {Subscription} from "rxjs";
import { AuthornamesPipe } from '../../pipes/authornames.pipe';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-author',
    templateUrl: './author.component.html',
    styleUrls: ['./author.component.css'],
    standalone: true,
    imports: [NgIf, AuthornamesPipe]
})
export class AuthorComponent implements OnInit, OnDestroy {
  selectedAuthor!: Author | null;
  private subscription!: Subscription;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private authorService: AuthorService = inject(AuthorService);

  ngOnInit(): void {
    console.log(true)
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.subscription = this.authorService.getAuthor(id).subscribe({
        next: (data: Author) => {
          this.selectedAuthor = data;
          console.log(data)
        },
        error: (_: any) => {
          this.selectedAuthor = null;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
