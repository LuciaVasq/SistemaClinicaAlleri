/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package implementaciones;

import interfaces.IPsicologoBO;
import java.util.List;
import org.itson.datos.interfaces.IPsicologoDAO;
import org.itson.dto.PsicologoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author erika
 */
@Service
public class PsicologoBO implements IPsicologoBO{
    @Autowired private IPsicologoDAO psicologoDAO;

    @Override
    public List<PsicologoDTO> obtenerPsicologos() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    
}
