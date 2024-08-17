import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerService } from '../../../../services/services';
import { ItemRequest } from '../../../../services/models';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss'
})
export class AddItemComponent implements OnInit{
  itemForm: FormGroup;
  userId: string | undefined;

  constructor(
    private fb: FormBuilder,
    private sellerService: SellerService,
    private router: Router,
    private route: ActivatedRoute,

  ) {
    this.itemForm = this.fb.group({
      sellerId: [this.userId],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userId = id === null ? undefined : id;
    console.log('userId', this.userId);
   
}

addItem() {
  if (this.itemForm.valid && this.userId) {
    const numericUserId: number = parseInt(this.userId, 10); // Convert userId to number
    const itemRequest: ItemRequest  = this.itemForm.value;
    // Add userId to the item data
    const itemData = {UserId: numericUserId, body: itemRequest};

    this.sellerService.createItem(itemData).subscribe(() => {
    this.router.navigate(['dashboard']); // Navigate to another route upon success
    });
  }
}

}

