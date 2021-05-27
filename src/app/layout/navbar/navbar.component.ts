import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Role } from 'src/app/enum/role.enum';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService
    ) { }

  ngOnInit(): void {
  }

public get isLoggedIn() :boolean {
  return this.authenticationService.isUserLoggedIn();
}

  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.SUPER_ADMIN;
  }


  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
  }

  public onLogOut(): void {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
    this.sendNotification(NotificationType.SUCCESS, `You've been successfully logged out`);
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }
}
