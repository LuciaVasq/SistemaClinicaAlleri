/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package IMappers;

import java.util.List;
import org.itson.dominio.entidades.Paciente;
import org.itson.dto.PacienteDTO;
import org.mapstruct.Mapper;

/**
 *
 * @author pablo
 */
@Mapper(componentModel = "spring")
public interface PacienteMapper {
    public PacienteDTO toDTOPaciente(Paciente paciente);
    public Paciente toPaciente(PacienteDTO pacientedto);
    public List<PacienteDTO> toCTOPacienteList(List<Paciente> paciente);
    public List<Paciente> toPacienteList(List<PacienteDTO> pacientedto);
}
