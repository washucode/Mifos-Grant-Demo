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
  /** Input server. */
  form: any;

  /** Server Settings. */
  // servers: string[];

  selectedServer: string = '';

  /** Server Setting */
  serverSelector = new UntypedFormControl('');

  /** Server list to show */
  existMoreThanOneServer = false;

  /**
   * @param {SettingsService} settingsService Settings Service
   */
  constructor(
    private settingsService: SettingsService,
    public dialog: MatDialog,
    private formBuilder: UntypedFormBuilder
  ) {}

  // ngOnInit(): void {
  //   this.servers = [
  //     'https://staging.mifos.io',
  //     'https://demo.mifos.io'
  //   ];

  //    if (!this.servers || this.servers.length === 0) {
  //   // If no servers exist, initialize from environment variables
  //   this.settingsService.setServers(environment.baseApiUrls.split(','));
  //   this.servers = this.settingsService.servers;
  //   }// Reload after setting
  //   this.existMoreThanOneServer = this.servers && this.servers.length > 1;
  //   if (!this.existMoreThanOneServer) {
  //     this.settingsService.setServer(this.servers[0]);
  //   } else {
  //     this.existMoreThanOneServer = true;
  //     this.serverSelector.patchValue(this.settingsService.server);
  //     this.form = this.formBuilder.group({
  //       url: [
  //         '',
  //         [Validators.required]
  //       ]
  //     });
  //   }
  // }
  servers: string[] = [
    'https://staging.mifos.io',
    'https://demo.mifos.io'
  ];
  ngOnInit(): void {
    console.log('Loaded Default Servers:', this.servers); // Debugging log

    // ✅ Get stored server OR fallback to Vercel environment variable
    let savedServer =
      localStorage.getItem('mifosXServerURL') ||
      (window as any)['NEXT_PUBLIC_MIFOSX_SERVER'] ||
      'https://demo.mifos.io';

    // ✅ Save the server if not already stored
    if (!localStorage.getItem('mifosXServerURL')) {
      localStorage.setItem('mifosXServerURL', savedServer);
      console.log('Server Set from Vercel:', savedServer);
    }

    // ✅ Ensure `mifosXServers` includes the saved server
    let storedServers = JSON.parse(localStorage.getItem('mifosXServers') || '[]');
    if (!storedServers.includes(savedServer)) {
      storedServers.push(savedServer);
      localStorage.setItem('mifosXServers', JSON.stringify(storedServers));
      console.log('Updated mifosXServers:', storedServers);
    }

    this.servers = storedServers; // ✅ Update dropdown list with stored servers
    this.selectedServer = savedServer;
    this.serverSelector = new UntypedFormControl(this.selectedServer);
    this.existMoreThanOneServer = this.servers.length > 1;

    console.log('Using Server:', this.selectedServer);
  }

  /**
   * Set backend server from the list
   */
  // setServer(): void {
  //   this.settingsService.setServer(this.serverSelector.value);
  // }
  // setServer(): void {
  //   this.selectedServer = this.serverSelector.value; // ✅ Directly update selectedServer
  //   console.log('Server Selected:', this.selectedServer); // Debugging log
  // }

  setServer(): void {
    if (!this.serverSelector.value) {
      console.error('No server selected!'); // Debugging log
      return;
    }

    this.selectedServer = this.serverSelector.value; // ✅ Directly update selectedServer
    localStorage.setItem('mifosXServerURL', this.selectedServer); // ✅ Persist selection
    console.log('Server Selected:', this.selectedServer); // Debugging log
  }

  /**
   * Add new server to the list.
   */
  addNewServer(): void {
    let servers = this.settingsService.servers || [];

    if (this.form.value.url) {
      this.settingsService.setServer(this.form.value.url);
      servers.push(this.form.value.url);
      this.settingsService.setServers(servers);
      console.log('New server added:', this.form.value.url); // ✅ Debugging log
      window.location.reload();
    } else {
      console.error('No URL entered!'); // ✅ Error handling
    }
  }
}
