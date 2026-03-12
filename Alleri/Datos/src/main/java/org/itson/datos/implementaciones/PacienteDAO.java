/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package org.itson.datos.implementaciones;

import org.itson.dominio.entidades.Paciente;
import org.itson.datos.interfaces.IPacienteDAO;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author erika
 */
@Repository
public interface PacienteDAO extends JpaRepository<Paciente, Long>, IPacienteDAO {
    @Override
    default List<Paciente> obtenerPacientes() {
        return findAll();
    }
    @Override
    default Paciente registrarPaciente(Paciente paciente) {
        return save(paciente);
    }
}
