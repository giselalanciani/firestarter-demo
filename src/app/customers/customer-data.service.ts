import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerDataService {
  customers: Customer[] = [];
  subscription!: Subscription;

  subscribeToCustomers() {
    if (!this.customers) {
      this.subscription = this.db
        .collection<Customer>('customers')
        .valueChanges({ idField: 'id' })
        .subscribe((customers) => {
          this.customers = customers;
        });
    }
  }

  getCustomer(id: string) {
    if (this.customers) {
      const cached = this.customers.find((v: any) => v.id === id);
      console.log('use cached');
      return of(cached);
    } else {
      console.log('use db');
      return this.db.collection<Customer>('customers').doc(id).valueChanges();
    }
  }

  dispose() {
    this.subscription.unsubscribe();
    this.customers = [];
  }
  constructor(private db: AngularFirestore) {}
}

export interface Customer {
  id: string;
  name: string;
}
