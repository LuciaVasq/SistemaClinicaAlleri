/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package implementaciones;

import interfaces.IPacienteBO;
import java.util.List;
import org.itson.datos.implementaciones.PacienteDAO;
import org.itson.dominio.entidades.Paciente;
import org.itson.dto.PacienteDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import IMappers.PacienteMapper;

/**
 *
 * @author erika
 */
@Service
public class PacienteBO implements IPacienteBO{
    @Autowired private PacienteDAO pacienteDAO;
    @Autowired private PacienteMapper pacienteMapper;

    @Override
    public List<PacienteDTO> obtenerPacientes() {
        List<Paciente> pacientes = pacienteDAO.obtenerPacientes();
        return pacienteMapper.toCTOPacienteList(pacientes);
    }

    @Override
    public PacienteDTO registrarPaciente(PacienteDTO pacientedto) {
        if (pacientedto == null) {
            throw new RuntimeException("No se pudo registrar el paciente con exito.");
        }
        Paciente pacienteNuevo = pacienteDAO.registrarPaciente(pacienteMapper.toPaciente(pacientedto));
        return pacienteMapper.toDTOPaciente(pacienteNuevo);
    }
}
