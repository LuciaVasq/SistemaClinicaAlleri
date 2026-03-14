/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package implementaciones;

import IMappers.CitaMapper;
import interfaces.IPagoBO;
import java.util.List;
import org.itson.datos.interfaces.IAdeudoDAO;
import org.itson.datos.interfaces.IPagoDAO;
import org.itson.dominio.entidades.Cita;
import org.itson.dominio.entidades.Pago;
import org.itson.dto.CitaDTO;
import org.itson.dto.PagoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import IMappers.PagoMapper;

/**
 *
 * @author erika
 */
@Service
public class PagoBO implements IPagoBO{
    @Autowired private IPagoDAO pagoDAO;
    @Autowired private IAdeudoDAO adeudoDAO;
    
    @Autowired private PagoMapper pagoMapper;
    @Autowired private CitaMapper citaMapper;
    

    @Override
    public PagoDTO pagarCitas(List<CitaDTO> citasdto, Long idPsicologo) {
        List<Cita> citas = citaMapper.toCitaList(citasdto);
        
        Pago pagoCita = pagoDAO.pagarCitas(citas,idPsicologo);
        
        return pagoMapper.toDTOPago(pagoCita);
    }
}
