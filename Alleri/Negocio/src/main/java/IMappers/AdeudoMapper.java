/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package IMappers;

import java.util.List;
import org.itson.dominio.entidades.Adeudo;
import org.itson.dto.AdeudoDTO;
import org.mapstruct.Mapper;

/**
 *
 * @author pablo
 */
@Mapper(componentModel = "spring")
public interface AdeudoMapper {
    public AdeudoDTO toDTOAdeudo(Adeudo adeudo);
    public Adeudo toAdeudo(AdeudoDTO adeudodto);
    public List<AdeudoDTO> toDTOAdeudoList(List<Adeudo> adeudos);
    public List<Adeudo> toAdeudoList(List<AdeudoDTO> adeudosdto);
}
