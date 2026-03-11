/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package interfaces;

import entidades.Cita;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Interfaz que define los metodos para la clase de citaDAO
 * @author erika
 */
public interface ICitaDAO {
    Cita agendarCita(Cita nuevaCita);
    Cita editarCita(Cita citaEditada);
    Cita eliminarCita(Cita cita);
    List<Cita> obtenerCitas(LocalDateTime dia);
}