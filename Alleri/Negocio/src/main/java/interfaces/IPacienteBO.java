/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package interfaces;

import java.util.List;
import org.itson.dto.PacienteDTO;

/**
 *
 * @author erika
 */
public interface IPacienteBO {
    public List<PacienteDTO> obtenerPacientes();
    public PacienteDTO registrarPaciente(PacienteDTO pacientedto);
}
