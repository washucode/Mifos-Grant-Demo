/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
/** Custom Services */
import { SettingsService } from 'app/settings/settings.service';
import { environment } from '../../../environments/environment';

/**
 * Server Selector Component
 */
@Component({
  selector: 'mifosx-server-selector',
  templateUrl: './server-selector.component.html',
  styleUrls: ['./server-selector.component.scss']
})
export class ServerSelectorComponent implements OnInit {
  form: any;
  selectedServer: string = '';
  serverSelector = new UntypedFormControl('');
  existMoreThanOneServer = false;
  servers: string[] = ['https://demo.mifos.io'];

  constructor(
    private settingsService: SettingsService,
    public dialog: MatDialog,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.selectedServer = 'https://demo.mifos.io';
    this.serverSelector = new UntypedFormControl(this.selectedServer);
    this.existMoreThanOneServer = false;
    this.settingsService.setServer(this.selectedServer);

    console.log('Using Fixed Server:', this.selectedServer);
  }

  setServer(): void {
    if (!this.serverSelector.value) {
      console.error('No server selected!');
      return;
    }

    this.selectedServer = this.serverSelector.value;
    localStorage.setItem('mifosXServerURL', this.selectedServer);
    console.log('Server Selected:', this.selectedServer);
  }

  addNewServer(): void {
    if (!this.form || !this.form.value || !this.form.value.url) {
      console.error('No URL entered!');
      return;
    }

    let servers = this.settingsService.servers || [];
    servers.push(this.form.value.url);
    this.settingsService.setServers(servers);
    this.settingsService.setServer(this.form.value.url);
    localStorage.setItem('mifosXServers', JSON.stringify(servers));
    localStorage.setItem('mifosXServerURL', this.form.value.url);
    console.log('New server added:', this.form.value.url);
    window.location.reload();
  }
}
