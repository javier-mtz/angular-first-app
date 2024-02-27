import { Component, OnInit, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { data } from '../../../assets/data/info';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  @Input() componentName: string | undefined;
  @Input() currentComponent: string | undefined;
  marca: string = '';
  color: string = '';
  logo: string = '';

  filteredData: any[] | undefined = []; 
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.marca = params['brand'];
      if (this.marca) {
        this.filteredData = data.filter((item) => item.marca === this.marca);
        if (this.filteredData.length > 0) {
          this.color = this.filteredData[0].paletaColores[0] || ''; // Asigna el color o un valor por defecto
          this.logo = this.filteredData[0].logo || ''; // Asigna el logo o un valor por defecto
        }
      }
      if(this.marca === undefined && this.componentName !== null) {
        this.marca = 'CarHistory';
      }
    });
  }
}
