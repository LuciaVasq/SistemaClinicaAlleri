/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package IMappers;

import java.util.List;
import org.itson.dominio.entidades.Adeudo;
import org.itson.dominio.entidades.Psicologo;
import org.itson.dto.AdeudoDTO;
import org.itson.dto.PsicologoDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 *
 * @author pablo
 */
@Mapper(componentModel = "spring")
public interface PsicologoMapper {
    @Mapping(target = "citas", ignore = true) 
    AdeudoDTO toAdeudoDTO(Adeudo adeudo);
    public PsicologoDTO toDTOPsicologo(Psicologo psicologo);
    public Psicologo toPsicologo(PsicologoDTO psicologodto);
    public List<PsicologoDTO> toCTOPsicologoList(List<Psicologo> psicologo);
    public List<Psicologo> toPsicologoList(List<PsicologoDTO> psicologodto);
}
