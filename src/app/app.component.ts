import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from './enum/notification-type.enum';
import { Role } from './enum/role.enum';
import { User } from './model/user';
import { AuthenticationService } from './service/authentication.service';
import { NotificationService } from './service/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Subscription-Billing-and-Payment-management-App';


  filterTerm: string;
  private user : User;
  
  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService
    ) { }

  ngOnInit(): void {

  }

  public onLogOut(): void {
    this.authenticationService.logOut();
    this.router.navigate(['/home']);
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
