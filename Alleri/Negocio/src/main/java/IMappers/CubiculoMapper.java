/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package IMappers;

import java.util.List;
import org.itson.dominio.entidades.Cubiculo;
import org.itson.dto.CubiculoDTO;
import org.mapstruct.Mapper;

/**
 *
 * @author pablo
 */
@Mapper(componentModel = "spring")
public interface CubiculoMapper {
    public CubiculoDTO toDTOCubiculo(Cubiculo cubiculo);
    public Cubiculo toCubiculo(CubiculoDTO cubiculodto);
    public List<CubiculoDTO> toCTOCubiculoList(List<Cubiculo> cubiculo);
    public List<Cubiculo> toCubiculoList(List<CubiculoDTO> cubiculodto);
}
