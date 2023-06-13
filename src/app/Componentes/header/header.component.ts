import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    @Input() sidebarExpand: boolean = true;

    constructor() {}

    ngOnInit(): void {}

    clickaqui() {
        // $('#myModal').modal('show');
    }
}
