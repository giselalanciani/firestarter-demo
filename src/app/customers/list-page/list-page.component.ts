import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Customer } from '../customer-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  customers!: Observable<
    (Customer & {
      id: string;
    })[]
  >;

  constructor(private seo: SeoService, private db: AngularFirestore) {}

  ngOnInit() {
    this.seo.generateTags({
      title: 'Customer List',
      description: 'A list filled with customers',
    });

    this.customers = this.db
      .collection<Customer>('customers')
      .valueChanges({ idField: 'id' });
  }
}
