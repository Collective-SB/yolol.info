import { Component, OnInit } from '@angular/core';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

// @ts-ignore
import libraryEntries from './library.json';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  library = libraryEntries;
  keys = Object.keys(libraryEntries);
  filteredLibrary = libraryEntries;
  bookOpen = faBookOpen;
  chevronLeft = faChevronLeft;
  libraryOpen = false;
  activeKey = this.library['goto'];

  searchPage: any;
  detailPageScroll: any;

  constructor() { }

  ngOnInit() {
    this.searchPage = document.getElementById('search-page');
    this.detailPageScroll = document.getElementsByClassName('scrollable')[1];
  }

  toggleLibrary() {
    this.libraryOpen = !this.libraryOpen;
  }

  inputChange(input) {
    this.filteredLibrary = {};
    this.keys = [];
    Object.keys(this.library).forEach(key => {
      for (const term of this.library[key].search_terms) {
        if (term.includes(input.toLowerCase())) {
          this.keys.push(key);
          this.filteredLibrary[key] = this.library[key];
          break;
        }
      }
    });
  }

  transitionToDetails(key) {
    this.searchPage.style.transform = 'translateX(-100%)';
    this.activeKey = this.library[key];
    this.detailPageScroll.scrollTo(0, 0);
  }

  transitionToSearch() {
    this.searchPage.style.transform = 'translateX(0)';
  }

}