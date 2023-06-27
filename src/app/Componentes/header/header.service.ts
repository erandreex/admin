import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class HeaderService {
    private baseUrl: string = environment.baseUrl;

    constructor() {}
}
