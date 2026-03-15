/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package IMappers;

import java.util.List;
import org.itson.dominio.entidades.Adeudo;
import org.itson.dominio.entidades.Cita;
import org.itson.dto.AdeudoDTO;
import org.itson.dto.CitaDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 *
 * @author pablo
 */
@Mapper(componentModel = "spring")
public interface CitaMapper {

    @Mapping(target = "citas", ignore = true)
    AdeudoDTO toAdeudoDTO(Adeudo adeudo);

    public CitaDTO toCTOCita(Cita cita);

    public Cita toCita(CitaDTO citadto);

    public List<CitaDTO> toCTOCitaList(List<Cita> citaS);

    public List<Cita> toCitaList(List<CitaDTO> citaSdto);
}
