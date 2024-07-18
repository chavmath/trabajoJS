export class Ticket {
    constructor(data) {
      this.ticket = data.id;
      this.estatus = data.estado;
      this.prioridad = data.prioridad;
      this.nombres = data.nombresolicitud;
      this.unidadHab = data.unidad;
      this.fechaCreacion = data.fechacreacion ? `${data.fechacreacion.split('T')[0]}, ${data.fechacreacion.split('T')[1].split(':')[0]}:${data.fechacreacion.split('T')[1].split(':')[1]}` : null;
      this.fechaActualizacion = data.fecha ? `${data.fecha.split('T')[0]}, ${data.fecha.split('T')[1].split(':')[0]}:${data.fecha.split('T')[1].split(':')[1]}` : null;
      this.categoria = data.categoria;
      this.observacion = data.descripcion;
      this.motivoDemora = data.motivoDemora;
      this.responsable = data.responsable;
      this.inmueble = data.inmueble;
    }
  }