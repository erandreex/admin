import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ModalsService {
    // Creacion del observable
    private modal = new Subject<HttpErrorResponse>();

    // Para subscribirse
    modal$ = this.modal.asObservable();

    // Para enviar valores
    modalInteraction(httpErrorResponse: HttpErrorResponse) {
        this.modal.next(httpErrorResponse);
    }
}
