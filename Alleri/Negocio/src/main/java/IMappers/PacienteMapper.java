/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package IMappers;

import java.util.List;
import org.itson.dominio.entidades.Adeudo;
import org.itson.dominio.entidades.Paciente;
import org.itson.dominio.entidades.Psicologo;
import org.itson.dto.AdeudoDTO;
import org.itson.dto.PacienteDTO;
import org.itson.dto.PsicologoDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 *
 * @author pablo
 */
@Mapper(componentModel = "spring")
public interface PacienteMapper {
    @Mapping(target = "citas", ignore = true)
    AdeudoDTO adeudoToAdeudoDTO(Adeudo adeudo);
    
    @Mapping(target = "adeudo", ignore = true)
    PsicologoDTO psicologoToPsicologoDTO(Psicologo psicologo);
    
    public PacienteDTO toDTOPaciente(Paciente paciente);
    public Paciente toPaciente(PacienteDTO pacientedto);
    public List<PacienteDTO> toCTOPacienteList(List<Paciente> paciente);
    public List<Paciente> toPacienteList(List<PacienteDTO> pacientedto);
}
