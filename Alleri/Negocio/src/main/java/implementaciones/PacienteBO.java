/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package implementaciones;

import interfaces.IPacienteBO;
import java.util.List;
import org.itson.datos.implementaciones.PacienteDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author erika
 */
@Service
public class PacienteBO implements IPacienteBO{
    @Autowired private PacienteDAO pacienteDAO;

    @Override
    public List<org.itson.dto.PacienteDTO> obtenerPacientes() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
}
