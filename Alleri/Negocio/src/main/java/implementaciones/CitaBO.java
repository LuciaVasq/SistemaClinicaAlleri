/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package implementaciones;

import java.time.LocalDateTime;
import java.util.List;
import org.itson.datos.interfaces.IAdeudoDAO;
import org.itson.datos.interfaces.ICitaDAO;
import org.itson.datos.interfaces.ICubiculoDAO;
import org.itson.dominio.entidades.Cita;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *AQUI FALTA IMPLEMENTAR LOS METODOS AAAAHHH
 * @author erika
 */
@Service
public class CitaBO implements ICitaDAO{
    @Autowired private ICitaDAO citaDAO;
    @Autowired private IAdeudoDAO adeudoDAO;
    @Autowired private ICubiculoDAO cubiculoDAO;

    @Override
    public Cita agendarCita(Cita nuevaCita) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public Cita editarCita(Cita citaEditada) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public Cita eliminarCita(Cita cita) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public List<Cita> obtenerCitas(LocalDateTime dia) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
}
