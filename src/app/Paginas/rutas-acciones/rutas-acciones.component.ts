import { Component, OnInit } from '@angular/core';
import { RutasAccionesService } from './rutas-acciones.service';
import { ModeloRutasAcciones } from './ModeloRutasAcciones';

@Component({
    selector: 'app-rutas-acciones',
    templateUrl: './rutas-acciones.component.html',
    styleUrls: ['./rutas-acciones.component.css'],
})
export class RutasAccionesComponent implements OnInit {
    constructor(private rutasAccionesService: RutasAccionesService) {}

    public rutasAcciones: ModeloRutasAcciones[] = [];

    ngOnInit(): void {
        this.rutasAccionesService.listar().subscribe((resp) => {
            this.rutasAcciones = resp.respuesta['rutas-acciones'];
        });
    }
}
