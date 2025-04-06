import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AccountService } from '../dashboards/services/account.service';
import { Unsubscriber } from 'techteec-lib/common';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    MatToolbar,
    RouterOutlet,
    MatIcon,
    RouterLink,
    RouterLinkActive,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatButtonModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent extends Unsubscriber {
  private accountService = inject(AccountService);
  authData$ = this.accountService.authData$;
  logging$ = this.accountService.logging$;

  login() {
    this._otherSubscription = this.accountService.login().subscribe();
  }
}
