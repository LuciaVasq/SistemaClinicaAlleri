/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package org.itson.datos.interfaces;

import org.itson.dominio.entidades.Paciente;
import java.util.List;
import org.itson.dominio.enumeradores.Estado;

/**
 *
 * @author erika
 */
public interface IPacienteDAO {
    Paciente obtenerPaciente(Long idPaciente);
    List<Paciente> obtenerPacientes();
    Paciente registrarPaciente(Paciente paciente);
    Paciente editarPaciente(Paciente pacienteEditado);
}
