<template>
    <div>
      <h1>Buscar Tickets</h1>
      <div class="row mb-3">
        <div class="col-2">
          <label for="fechaInicial">Fecha Inicial:</label>
          <input type="date" v-model="Busqueda.fechaInicial" class="form-control" id="fechaInicial">
        </div>
        <div class="col-2">
          <label for="fechaFinal">Fecha Final:</label>
          <input type="date" v-model="Busqueda.fechaFinal" class="form-control" id="fechaFinal">
        </div>
        <div class="col d-flex align-items-end">
          <button @click="buscar" class="btn btn-primary">Buscar</button>
        </div>
      </div>
  
      <div v-if="ticketEncontrado">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Estatus</th>
              <th>Prioridad</th>
              <th>Nombre</th>
              <th>Unidad Hab</th>
              <th>Fecha Creación</th>
              <th>Fecha Actualización</th>
              <th>Categoría</th>
              <th>Observación</th>
              <th>Motivo Demora</th>
              <th>Responsable</th>
              <th>Inmueble</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in paginatedData" :key="item.ticket">
              <td>{{ item.ticket }}</td>
              <td>{{ item.estatus }}</td>
              <td>{{ item.prioridad }}</td>
              <td>{{ item.nombres }}</td>
              <td>{{ item.unidadHab }}</td>
              <td>{{ item.fechaCreacion }}</td>
              <td>{{ item.fechaActualizacion }}</td>
              <td>{{ item.categoria }}</td>
              <td>{{ item.observacion }}</td>
              <td>{{ item.motivoDemora }}</td>
              <td>{{ item.responsable }}</td>
              <td>{{ item.inmueble }}</td>
            </tr>
          </tbody>
        </table>
        
        <div class="slider-buttons">
          <div v-for="(page, index) in pageCount" :key="index" class="slider-button"
            :class="{ active: currentPage === index }" @click="goToPage(index)"></div>
        </div>
        
        <div class="row mt-3">
          <div class="col-md-3">
            <select v-model="selectedStatus" class="form-control">
              <option value="">Todos los Estados</option>
              <option value="Cerrado">Cerrado</option>
              <option value="Demorado">Demorado</option>
              <option value="Abierto">Abierto</option>
            </select>
          </div>
          <div class="col-md-2">
            <button @click="filtrarPorEstado" class="btn btn-primary">Buscar por Estado</button>
          </div>
        </div>
        
        <div v-if="showFilteredTable && filteredData.length > 0" class="mt-3">
          <h2>Resultados Filtrados</h2>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Estatus</th>
                <th>Prioridad</th>
                <th>Nombre</th>
                <th>Unidad Hab</th>
                <th>Fecha Creación</th>
                <th>Fecha Actualización</th>
                <th>Categoría</th>
                <th>Observación</th>
                <th>Motivo Demora</th>
                <th>Responsable</th>
                <th>Inmueble</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredData" :key="item.ticket">
                <td>{{ item.ticket }}</td>
                <td>{{ item.estatus }}</td>
                <td>{{ item.prioridad }}</td>
                <td>{{ item.nombres }}</td>
                <td>{{ item.unidadHab }}</td>
                <td>{{ item.fechaCreacion }}</td>
                <td>{{ item.fechaActualizacion }}</td>
                <td>{{ item.categoria }}</td>
                <td>{{ item.observacion }}</td>
                <td>{{ item.motivoDemora }}</td>
                <td>{{ item.responsable }}</td>
                <td>{{ item.inmueble }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div v-else>
        <p>No se encontraron tickets en el rango de fechas especificado.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { TicketController } from '../controllers/TicketController.js';
  
  export default {
    data() {
      return {
        Busqueda: {
          fechaInicial: '',
          fechaFinal: ''
        },
        ticketEncontrado: null,
        currentPage: 0,
        itemsPerPage: 5,
        reportData: [],
        selectedStatus: '',
        filteredData: [],
        showFilteredTable: false
      };
    },
    computed: {
      paginatedData() {
        const start = this.currentPage * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.reportData.slice(start, end);
      },
      pageCount() {
        return Math.ceil(this.reportData.length / this.itemsPerPage);
      },
      totalTickets() {
        return this.reportData.length;
      }
    },
    methods: {
      async buscar() {
        const { fechaInicial, fechaFinal } = this.Busqueda;
        const tickets = await TicketController.buscarTickets(fechaInicial, fechaFinal);
        if (tickets.length === 0) {
          this.ticketEncontrado = false;
          this.reportData = [];
          this.filteredData = [];
          this.showFilteredTable = false;
        } else {
          this.ticketEncontrado = true;
          this.reportData = tickets;
          this.filteredData = tickets; // Inicialmente sin filtro
          this.currentPage = 0; // Reset to the first page after a new search
          this.showFilteredTable = false; // Hide the filtered table initially
        }
      },
      goToPage(page) {
        this.currentPage = page;
      },
      filtrarPorEstado() {
        if (this.selectedStatus) {
          this.filteredData = this.reportData.filter(ticket => ticket.estatus === this.selectedStatus);
        } else {
          this.filteredData = this.reportData;
        }
        this.currentPage = 0; // Reset to the first page after filtering
        this.showFilteredTable = true; // Show the filtered table
      }
    }
  };
  </script>
  
  <style scoped>
  .slider-buttons {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 0px;
  }
  
  .slider-button {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #f2f2f2;
    margin: 0 5px;
    cursor: pointer;
    border: 1px solid #93459f;
  }
  
  .slider-button.active {
    background-color: #939397;
  }
  
  .date{
    display: flex;
    justify-content: center;
    width: 50px;
  }
  </style>
  