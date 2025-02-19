/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UntypedFormBuilder, Validators } from '@angular/forms';
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
  servers: string[];

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

  gOnInit(): void {
    // ✅ Hardcoded server URLs (only picking from these)
    this.servers = [
      'https://staging.mifos.io',
      'https://demo.mifos.io'
    ];

    console.log('Loaded Servers:', this.servers); // Debugging log

    // ✅ Determine if multiple servers exist
    this.existMoreThanOneServer = this.servers.length > 1;

    // ✅ Initialize Form Control with the first server as the default
    this.serverSelector = new FormControl(this.servers[0]);

    if (!this.existMoreThanOneServer) {
      // ✅ Auto-select the only available server
      this.selectedServer = this.servers[0];
    } else {
      // ✅ Allow user selection
      this.selectedServer = this.servers[0];
      this.serverSelector.patchValue(this.selectedServer);

      // ✅ Initialize form for adding a new server (optional)
      this.form = this.formBuilder.group({
        url: ['', [Validators.required]]
      });
    }
  }

  /**
   * Set backend server from the list
   */
  setServer(): void {
    this.settingsService.setServer(this.serverSelector.value);
  }

  /**
   * Add new server to the list.
   */
  addNewServer(): void {
    let servers;
    this.settingsService.setServer(this.form.value.url);
    servers = this.settingsService.servers;
    servers.push(this.form.value.url);
    this.settingsService.setServers(servers);
    window.location.reload();
  }
}
