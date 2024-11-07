import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeviceService } from './app-services/device.service';
import { NgClass } from '@angular/common';
import { NavigationComponent } from "./navigation/navigation.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  deviceType = inject(DeviceService).deviceType;
}
