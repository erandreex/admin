import { Component } from '@angular/core';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css'],
})
export class IndexComponent {
    public sidebarExpand: boolean = true;

    holaquehace($event: boolean) {
        this.sidebarExpand = $event;
    }
}
