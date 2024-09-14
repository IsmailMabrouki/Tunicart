import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/services';

@Component({
  selector: 'app-activity-history',
  templateUrl: './activity-history.component.html',
  styleUrl: './activity-history.component.scss'
})
export class ActivityHistoryComponent  implements OnInit {
  userId: string | undefined;

  activities: any[] = [];
  authActivities: any[] = [];
  purchaseActivities: any[] = [];
  displayedActivities: any[] = [];

  showAuthActivities: boolean = true;

  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalAuthPages: number = 0;
  totalPurchasePages: number = 0;


  constructor(
    private route: ActivatedRoute,
    private userService:  UserService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userId = id === null ? undefined : id;
    console.log('userId', this.userId);
    if (this.userId) {
      const numericUserId = parseInt(this.userId, 10); 
      this.loadActivityHistory(numericUserId);
    }
  }

  loadActivityHistory(id: number): void {
    this.userService.getActivityHistoryByUserId({userId : id}).subscribe({
      next: (data: any[]) => {
        this.activities = data;
        this.authActivities = data.filter(activity => activity.actionType === 'Authentication');
        this.displayedActivities  = data.filter(activity => activity.actionType === 'Authentication');
        this.purchaseActivities = data.filter(activity => activity.actionType === 'purchase');
      },
      error: (error: any) => {
        console.error('Error fetching activity history', error);
      }
    });
  }
  updateDisplayedActivities(): void {
    if (this.showAuthActivities) {
      this.displayedActivities = this.paginate(this.authActivities);
      this.totalAuthPages = Math.ceil(this.authActivities.length / this.itemsPerPage);
    } else {
      this.displayedActivities = this.paginate(this.purchaseActivities);
      this.totalPurchasePages = Math.ceil(this.purchaseActivities.length / this.itemsPerPage);
    }
  }

  paginate(activities: any[]): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return activities.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateDisplayedActivities();
  }

  onToggleActivities(showAuth: boolean): void {
    this.showAuthActivities = showAuth;
    this.currentPage = 1;
    this.updateDisplayedActivities();
  }
}