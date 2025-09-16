import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  public lipsum: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in elit non dolor mattis aliquam. Integer luctus purus eget semper ullamcorper. Aenean et pretium nibh. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec at ornare erat. Donec tincidunt turpis sit amet sapien sollicitudin, quis tempor nisi fermentum. Nam ornare, sapien et pulvinar porttitor, mi lorem eleifend nulla, ut convallis ipsum nisi sagittis massa. Nulla tristique eros id commodo efficitur. Vestibulum euismod, nisl vel luctus consectetur, nulla orci blandit risus, non aliquet est diam vel libero.';

  public data = [
    'España',
    'Bélgica',
    'Francia',
    'Alemania',
    'Suecia',
    'Suiza',
    'Austria',
    'Portugal',
    'Italia',
    'Croacia',
  ];

  public results = [...this.data];

  constructor() { }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.data.filter(item => item.toLowerCase().indexOf(query) > -1);
  }
}

