/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package implementaciones;

import interfaces.IPsicologoBO;
import java.util.List;
import org.itson.datos.interfaces.IPsicologoDAO;
import org.itson.dominio.entidades.Psicologo;
import org.itson.dto.PsicologoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import IMappers.PsicologoMapper;

/**
 *
 * @author erika
 */
@Service
public class PsicologoBO implements IPsicologoBO{
    @Autowired private IPsicologoDAO psicologoDAO;
    
    @Autowired private PsicologoMapper psicologoMapper;

    @Override
    public List<PsicologoDTO> obtenerPsicologos() {
        List<Psicologo> psicologos = psicologoDAO.obtenerPsicologos();
        
        return psicologoMapper.toCTOPsicologoList(psicologos);
    }
}
