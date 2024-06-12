import { Component, OnInit } from '@angular/core';
import { RickMortyService } from 'src/app/services/rick.morty.service';
import { ActivatedRoute } from '@angular/router';
interface Item {
  id: number;
  name: string;
  episode?: string;
  characters?: {};
}
@Component({
  selector: 'app-list-rick-morty',
  templateUrl: './list-rick-morty.component.html',
  styleUrls: ['./list-rick-morty.component.scss'],
})
export class ListRickMortyComponent implements OnInit {
  datosTotales: Item[] = [];
  datosPaginados: any[] = [];
  totalDatos = 0;
  itemsPorPagina = 10;
  isLoading = true;
  paginaActual = 1;
  displayedColumns: string[] = ['id', 'name', 'air_date', 'episode', 'characters'];

  constructor(
    private rickMortyService: RickMortyService,
    private route: ActivatedRoute,
  ) {}

  getDatosPaginados(pagina: number, itemsPorPagina: number): { data: Item[]; totalDatos: number } {
    const startIndex = (pagina - 1) * itemsPorPagina;
    const endIndex = startIndex + itemsPorPagina;
    const datosPaginados = this.datosTotales.slice(startIndex, endIndex);
    return { data: datosPaginados, totalDatos: this.datosTotales.length };
  }

  ngOnInit(): void {
    this.isLoading = false;
    this.rickMortyService.getEpisodes().subscribe(
      (data: any) => {
        data.forEach((element: any) => {
          this.datosTotales.push(...element.results);
        });
        this.isLoading = true;
        this.cargarDatos();
      },
      (error: any) => {
        this.isLoading = true;
      },
    );
  }

  cargarDatos(): void {
    const resultado = this.getDatosPaginados(this.paginaActual, this.itemsPorPagina);
    this.datosPaginados = resultado.data;
    this.totalDatos = resultado.totalDatos;
  }

  onPageChange(event: any): void {
    this.paginaActual = event.pageIndex + 1;
    this.itemsPorPagina = event.pageSize;
    this.cargarDatos();
  }

  hasChildRoute(): boolean {
    return this.route.firstChild !== null;
  }
}
