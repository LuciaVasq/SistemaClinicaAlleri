/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package implementaciones;

import interfaces.ICubiculoBO;
import java.util.List;
import org.itson.datos.interfaces.ICubiculoDAO;
import org.itson.dominio.entidades.Cubiculo;
import org.itson.dto.CubiculoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import IMappers.CubiculoMapper;

/**
 *
 * @author erika
 */
@Service
public class CubiculoBO implements ICubiculoBO{
    @Autowired private ICubiculoDAO cubiculoDAO;
    @Autowired private CubiculoMapper cubiculoMapper;
    
    @Override
    public List<CubiculoDTO> obtenerCubiculos() {
        List<Cubiculo> cubiculos = cubiculoDAO.obtenerCubiculos();
        
        return cubiculoMapper.toCTOCubiculoList(cubiculos);
    }
    
}
