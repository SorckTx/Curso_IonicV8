import { Component, OnInit } from '@angular/core';
import type { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
  standalone: false,
})
export class ContactsPage implements OnInit {
  contactos: any[] = [];
  items = [
    {
      name: 'Juan Perez',
      date: new Date(),
      avatar: 'assets/avatar.svg'
    },
    {
      name: 'Lio Messi',
      date: new Date(),
      avatar: 'assets/avatar.svg'
    },
    {
      name: 'Carlos Tevez',
      date: new Date(),
      avatar: 'assets/avatar.svg'
    },
    {
      name: 'Charly Garcia',
      date: new Date(),
      avatar: 'assets/avatar.svg'
    },
    {
      name: 'L. A. Spinetta',
      date: new Date(),
      avatar: 'assets/avatar.svg'
    },
    {
      name: 'Ricardo Mollo',
      date: new Date(),
      avatar: 'assets/avatar.svg'
    },
  ];
  constructor() { }

  ngOnInit() {
    this.obtenerItems(5);
  }

  obtenerItems(qty: number) {
    for (let i = 0; i < qty; i++) {
      const randomId = Math.floor(this.items.length * Math.random());
      const item = { ...this.items[randomId] }
      this.contactos.push(item);
    }
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    this.obtenerItems(3);
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
