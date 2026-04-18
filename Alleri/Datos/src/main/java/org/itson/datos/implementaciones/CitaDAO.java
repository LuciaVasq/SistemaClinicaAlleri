/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package org.itson.datos.implementaciones;

import org.itson.dominio.entidades.Cita;
import org.itson.datos.interfaces.ICitaDAO;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author erika
 */
@Repository
public interface CitaDAO extends JpaRepository<Cita, Long>, ICitaDAO {
    
    @Override
    default Cita agendarCita(Cita nuevaCita) {
        return save(nuevaCita);
    }

    @Override
    default Cita editarCita(Cita citaEditada) {
        return save(citaEditada);
    }

    @Override
    default Cita eliminarCita(Cita cita) {
        delete(cita);
        return cita;
    }

    @Override
    default List<Cita> obtenerCitas(LocalDateTime dia) {
        LocalDateTime inicio = dia.withHour(0).withMinute(0);
        LocalDateTime fin = dia.withHour(23).withMinute(59);
        return findByFechaHoraInicioBetweenOrderByFechaHoraInicioAsc(inicio, fin);
    }

    List<Cita> findByFechaHoraInicioBetweenOrderByFechaHoraInicioAsc(LocalDateTime inicio, LocalDateTime fin);
}
