import { Component, OnInit } from '@angular/core';
import { RutasService } from './rutas.service';
import { Ruta } from 'src/app/Modelos/ModeloRutas';

@Component({
    selector: 'app-rutas',
    templateUrl: './rutas.component.html',
    styleUrls: ['./rutas.component.css'],
})
export class RutasComponent implements OnInit {
    constructor(private rutasService: RutasService) {}

    public rutas: Ruta[] = [];

    ngOnInit(): void {
        this.rutasService.listar().subscribe((resp) => {
            this.rutas = resp.respuesta.rutas;

            console.log(this.rutas);
        });
    }
}
