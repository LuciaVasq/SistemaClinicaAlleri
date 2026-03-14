/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package implementaciones;

import interfaces.IPagoBO;
import java.util.List;
import org.itson.datos.interfaces.IAdeudoDAO;
import org.itson.datos.interfaces.IPagoDAO;
import org.itson.dto.CitaDTO;
import org.itson.dto.PagoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author erika
 */
@Service
public class PagoBO implements IPagoBO{
    @Autowired private IPagoDAO pagoDAO;
    @Autowired private IAdeudoDAO adeudoDAO;

    @Override
    public PagoDTO pagarCitas(List<CitaDTO> citas) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
}
