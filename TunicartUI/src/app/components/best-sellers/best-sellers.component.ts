import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../services/models';
import { PublicService } from '../../services/services';

@Component({
  selector: 'app-best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrls: ['./best-sellers.component.scss']
})
export class BestSellersComponent implements OnInit {

  users: User[] = []; // List of best-selling sellers

  constructor(private publicService: PublicService) {}

  ngOnInit(): void {
    this.fetchBestSellers();
  }

  fetchBestSellers(): void {
    this.publicService.getAllSellers$Response().subscribe({
      next: (response: any) => {
        // Handle the response according to the structure returned by the service
        const userlist = response.body as User[];
        this.users = userlist.slice(0, 8); // Adjust this line based on actual response structure
        console.log('sellers:', this.users);
      },
      error: (err) => {
        console.error('Error fetching sellers', err);
      }
    });
  }
}
