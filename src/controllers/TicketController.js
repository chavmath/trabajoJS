import axios from 'axios';
import { Ticket } from '../models/Ticket.js';

export const TicketController = {
  async buscarTickets(fechaInicial, fechaFinal) {
    try {
      const response = await axios.get(`https://crud-back-mlk9.onrender.com/listaticketweb/${fechaInicial}/${fechaFinal}`);
      if (response.data.length === 0) {
        return [];
      } else {
        return response.data.map(item => new Ticket(item));
      }
    } catch (error) {
      console.error("Error al buscar tickets:", error);
      return [];
    }
  }
};