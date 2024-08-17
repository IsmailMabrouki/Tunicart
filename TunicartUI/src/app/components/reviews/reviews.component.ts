import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { FeedbackResponse } from '../../services/models/feedback-response';
import { FeedbackService } from '../../services/services';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnDestroy{
  feedbackList: FeedbackResponse[] = []; // Ensure it's initialized to an empty array
  topFeedbackList: FeedbackResponse[] = [];
  rating : number = 5;
  cardPositions = [
    { top: '10%', left: '15%' },
    { top: '10%', left: '50%' },
    { top: '50%', left: '5%' },
    { top: '50%', left: '35%' },
    { top: '30%', left: '75%' }
  ];
  intervalId: any;
  

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedback();
    this.updatePositions();
    this.intervalId = setInterval(() => {
      this.updatePositions();
    }, 5000); // 5000ms = 5 seconds
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  updatePositions(): void {
    this.cardPositions = [
      { top: '10%', left: this.getRandomPercentage() },
      { top: '10%', left: this.getRandomPercentage() },
      { top: '50%', left: this.getRandomPercentage() },
      { top: '50%', left: this.getRandomPercentage() },
      { top: '30%', left: this.getRandomPercentage() }
    ];
  }

  getRandomPercentage(): string {
    // Generates a random percentage between 5% and 80%
    return `${Math.floor(Math.random() * 76) + 5}%`;
  }

  // shufflePositions(): void {
  //   this.cardPositions = this.cardPositions
  //     .map(value => ({ value, sort: Math.random() }))
  //     .sort((a, b) => a.sort - b.sort)
  //     .map(({ value }) => value);
  // }

  getPosition(index: number): { [key: string]: string } {
    return this.cardPositions[index] || { top: '0', left: '0' };
  }

  loadFeedback(): void {
    this.feedbackService.getAllFeedback().subscribe(
      (feedbacks: FeedbackResponse[]) => {
        this.feedbackList = feedbacks;
        this.sortAndFilterFeedback();
      
      },
      (error) => {
        console.error('Error loading feedback:', error);
        // Handle error case
      }
    );
  }

  sortAndFilterFeedback(): void {
       // Sort feedbackList by rating in descending order
       this.feedbackList.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
       // Take the top 5 feedbacks
       this.topFeedbackList = this.feedbackList.slice(0, 5);
       console.log("topFeedbackList", this.topFeedbackList)
   
  }

  startRealTimeMovement(): void {
    const feedbackCards = document.querySelectorAll('.feedback-card');
    const container = document.querySelector('.review-container') as HTMLElement;

    if (container) {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      // Function to move cards to random positions
      const moveCards = () => {
        feedbackCards.forEach((card: Element) => {
          if (card instanceof HTMLElement) {
            const cardWidth = card.clientWidth;
            const cardHeight = card.clientHeight;

            // Generate random positions within the container
            const randomX = Math.random() * (containerWidth - cardWidth);
            const randomY = Math.random() * (containerHeight - cardHeight);

            // Apply the new position using transform
            card.style.transform = `translate(${randomX}px, ${randomY}px)`;
          }
        });
      };

      // Move cards every 1 second (adjust as needed)
      this.intervalId = setInterval(moveCards, 1000);
    }
  }

 


  // getPosition(index: number): { [key: string]: string } {
  //   const positions = [
  //     { top: '10%', left: '15%' },
  //     { top: '10%', left: '50%' },
  //     { top: '50%', left: '5%' },
  //     { top: '50%', left: '35%' },
  //     { top: '30%', left: '75%' }
  //   ];
  //   return positions[index] || { top: '0', left: '0' };
  // }

}