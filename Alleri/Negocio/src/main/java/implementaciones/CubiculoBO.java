/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package implementaciones;

import interfaces.ICubiculoBO;
import java.util.List;
import org.itson.datos.interfaces.ICubiculoDAO;
import org.itson.dto.CubiculoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author erika
 */
@Service
public class CubiculoBO implements ICubiculoBO{
    @Autowired private ICubiculoDAO cubiculoDAO;
    @Override
    public List<CubiculoDTO> obtenerCubiculos() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
}
