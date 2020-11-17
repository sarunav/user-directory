import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SharedService } from 'src/app/shared/service/shared.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  isLoading: Subject<boolean>;

  constructor(private sharedService: SharedService) {
    this.isLoading = this.sharedService.isLoading;
  }

  ngOnInit(): void {
    this.isLoading.subscribe((res: any) => {});
  }
}
