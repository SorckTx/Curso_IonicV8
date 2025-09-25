import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
  standalone: false,
})
export class FeedPage implements OnInit {

  feedItems: any[] = [];
  items: any[] = [
    {
      title: 'Juan Perez',
      date: new Date(),
      image: null,
      text: 'Esto es un post ejemplo',
    },
    {
      title: 'Pedro Gonzalez',
      date: new Date(),
      image: null,
      text: 'Este es otro post ejemplo.',
    },
    {
      title: 'Marta Martinez',
      date: new Date(),
      image: null,
      text: 'Mucho texto para agregar por aqui.',
    },
    {
      title: 'Carlos Fernandez',
      date: new Date(),
      image: null,
      text: 'Y aún todavía mas por aquí.',
    }
  ];
  constructor() { }

  ngOnInit() {
    this.agregarItems(4);
  }

  agregarItems(qty: number) {
    for (let i = 0; i < qty; i++) {
      const randomId = Math.floor(this.items.length * Math.random());
      const item = { ...this.items[randomId] };
      item.nuevo = true;
      this.feedItems.unshift(item);
    }
  }

  handleRefresh(refreshEvent: any) {
    setTimeout(() => {
      this.agregarItems(3);
      refreshEvent.target.complete();
    }, 2000);
  }
}
