import { Component, OnInit } from '@angular/core';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

// @ts-ignore
import libraryEntries from './library.json';
import {DarkmodeService} from '../../darkmode.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  bookOpen = faBookOpen;
  entries = libraryEntries.entries.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });
  filteredEntries: any;
  activeKey = this.entries[0];
  toggled = false;
  darkmode: boolean;

  constructor(private darkmodeService: DarkmodeService,
              private route: ActivatedRoute) {
    // @ts-ignore
    this.darkmode = route.queryParams.value.mode === 'dark';
    this.filteredEntries = this.entries;
  }

  ngOnInit() {
    this.darkmodeService.darkMode$.subscribe( val => {
      this.darkmode = val;
    });
  }

  inputChange(input) {
    this.filteredEntries = [];
    this.entries.forEach(entry => {
      entry.search_terms.forEach(searchTerm => {
        if (searchTerm.includes(input.toLowerCase()) && !this.filteredEntries.includes(entry)) {
          this.filteredEntries.push(entry);
        }
      });
    });
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
