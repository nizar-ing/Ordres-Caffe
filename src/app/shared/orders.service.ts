import { Injectable } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  form = new FormGroup({
    customerName: new FormControl(''),
    orderNumber: new FormControl(''),
    coffeeOrder: new FormControl(''),
    completed: new FormControl(false)
  });
  constructor(private firestore: AngularFirestore) { }
  createCoffeeOrder(data) {
    return this.firestore.collection('coffeeOrders').add(data);
  }
  getCoffeeOrders() {
    return this.firestore.collection('coffeeOrders').snapshotChanges();
  }

  updateCoffeeOrder(data) {
    return this.firestore.collection('coffeeOrders').doc(data.payload.doc.id).set({ completed: true}, { merge: true });
  }

  deleteCoffeeOrder(data) {
    return this.firestore.collection('coffeeOrders').doc(data.payload.doc.id).delete();
  }
}
