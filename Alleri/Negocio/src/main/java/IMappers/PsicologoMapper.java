/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package IMappers;

import java.util.List;
import org.itson.dominio.entidades.Psicologo;
import org.itson.dto.PsicologoDTO;
import org.mapstruct.Mapper;

/**
 *
 * @author pablo
 */
@Mapper(componentModel = "spring")
public interface PsicologoMapper {
    public PsicologoDTO toDTOPsicologo(Psicologo psicologo);
    public Psicologo toPsicologo(PsicologoDTO psicologodto);
    public List<PsicologoDTO> toCTOPsicologoList(List<Psicologo> psicologo);
    public List<Psicologo> toPsicologoList(List<PsicologoDTO> psicologodto);
}
