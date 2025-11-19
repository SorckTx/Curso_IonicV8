import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Login', url: '/login', icon: 'log-in' },
    { title: 'Feed', url: '/feed', icon: 'list' },
    { title: 'Contacts', url: '/contacts', icon: 'people' },
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public isDarkMode = false;

  constructor() { }

  ngOnInit(): void {
    const storedPreference = localStorage.getItem('dark-mode');
    if (storedPreference !== null) {
      this.isDarkMode = storedPreference === 'true';
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.isDarkMode = true;
    }
    this.applyTheme();
  }

  onDarkModeToggle(enabled: boolean) {
    this.isDarkMode = enabled;
    localStorage.setItem('dark-mode', String(enabled));
    this.applyTheme();
  }

  private applyTheme() {
    document.body.classList.toggle('dark', this.isDarkMode);
  }
}
