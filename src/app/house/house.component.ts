import { Component } from '@angular/core';
import { HouseService } from '../services/house.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-house',
  standalone: false,
  templateUrl: './house.component.html',
  styleUrl: './house.component.css',
})
export class HouseComponent {
  houses: any[] = [];
  houseForm: FormGroup;
  isEditing = false;
  editingHouseId: number | null = null;

  constructor(
    private houseService: HouseService,
    private fb: FormBuilder
  ) {
    this.houseForm = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    });

    this.loadHouses();
  }

  loadHouses() {
    this.houseService.getAllHouses().subscribe((data: any) => {
      this.houses = data;
    });
  }

  onSubmit() {
    if (this.houseForm.valid) {
      if (this.isEditing && this.editingHouseId !== null) {
        this.houseService.updateHouse(this.editingHouseId, this.houseForm.value)
          .subscribe(() => {
            this.loadHouses();
            this.resetForm();
          });
      } else {
        this.houseService.createHouse(this.houseForm.value)
          .subscribe(() => {
            this.loadHouses();
            this.resetForm();
          });
      }
    }
  }

  editHouse(house: any) {
    this.isEditing = true;
    this.editingHouseId = house.id;
    this.houseForm.patchValue(house);
  }

  deleteHouse(id: number) {
    if (confirm('Are you sure you want to delete this house?')) {
      this.houseService.deleteHouse(id)
        .subscribe(() => {
          this.loadHouses();
        });
    }
  }

  resetForm() {
    this.houseForm.reset();
    this.isEditing = false;
    this.editingHouseId = null;
  }
}
