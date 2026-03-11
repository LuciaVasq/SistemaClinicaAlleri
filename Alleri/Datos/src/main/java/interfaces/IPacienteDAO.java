/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package interfaces;

import entidades.Paciente;
import java.util.List;

/**
 *
 * @author erika
 */
public interface IPacienteDAO {
    List<Paciente> obtenerPacientes();
}
