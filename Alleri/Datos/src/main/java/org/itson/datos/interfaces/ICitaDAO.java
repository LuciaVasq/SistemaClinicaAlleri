/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package org.itson.datos.interfaces;

import org.itson.dominio.entidades.Cita;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Interfaz que define los metodos para la clase de citaDAO
 *
 * @author erika
 */
public interface ICitaDAO {

    Cita agendarCita(Cita nuevaCita);

    Cita editarCita(Cita citaEditada);

    Cita eliminarCita(Cita cita);

    List<Cita> obtenerCitas(LocalDateTime dia);

    Optional<Cita> findById(Long id);
}
