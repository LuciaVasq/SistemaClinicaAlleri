/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package implementaciones;

import IMappers.CitaMapper;
import interfaces.ICitaBO;
import java.time.LocalDateTime;
import java.util.List;
import org.itson.datos.interfaces.IAdeudoDAO;
import org.itson.datos.interfaces.ICitaDAO;
import org.itson.datos.interfaces.ICubiculoDAO;
import org.itson.dominio.entidades.Cita;
import org.itson.dto.AdeudoDTO;
import org.itson.dto.CitaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author erika
 */
@Service
public class CitaBO implements ICitaBO {

    @Autowired
    private ICitaDAO citaDAO;
    @Autowired
    private IAdeudoDAO adeudoDAO;
    @Autowired
    private ICubiculoDAO cubiculoDAO;
    
    @Autowired
    private CitaMapper citaMapper;

    @Override
    public CitaDTO agendarCita(CitaDTO nuevaCita) {
        if (nuevaCita.getFechaHoraInicio().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("No se puede agendar una cita en el pasado.");
        }

        if (nuevaCita.getPsicologo() == null || nuevaCita.getCubiculo() == null ||  nuevaCita.getPaciente() == null) {
            throw new RuntimeException("La cita no puede ser agendada debido a información faltante.");
        }

        Cita citanueva = citaMapper.toCita(nuevaCita);
        Cita guardada = citaDAO.agendarCita(citanueva);
        
        return citaMapper.toCTOCita(guardada);
    }

    @Override
    public CitaDTO editarCita(CitaDTO citaEditada) {
        if (citaEditada == null) {
            throw new RuntimeException("La cita debe existir para ser editada.");
        }
        
        if (citaEditada.getFechaHoraInicio().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("No se puede agendar una cita en el pasado.");
        }
        
        if (citaEditada.getPsicologo() == null || citaEditada.getCubiculo() == null ||  citaEditada.getPaciente() == null) {
            throw new RuntimeException("La cita no puede ser editada debido a información faltante.");
        }
        
        Cita citanueva = citaMapper.toCita(citaEditada);
        Cita editada = citaDAO.editarCita(citanueva);
        
        return citaMapper.toCTOCita(editada);
    }

    @Override
    public CitaDTO eliminarCita(CitaDTO cita) {
        if (cita == null) {
            throw new RuntimeException("La cita debe existir para ser eliminada.");
        }
        
       Cita citanueva = citaMapper.toCita(cita);
        Cita eliminada = citaDAO.eliminarCita(citanueva);
        
        return citaMapper.toCTOCita(eliminada);
    }

    @Override
    public List<CitaDTO> obtenerCitas(LocalDateTime dia) {
        List<Cita> citas = citaDAO.obtenerCitas(dia);
        return citaMapper.toCTOCitaList(citas);
    }

    @Override
    public void actualizarAdeudo(List<CitaDTO> citasdto, Long idPsicologo) {
        List<Cita> citas = citaMapper.toCitaList(citasdto);
        
        if (citas.isEmpty() || citas == null) {
            throw new RuntimeException("No se obtuvieron citas a las cuales actualizarle el adeudo.");
        }
        
        adeudoDAO.actualizarAdeudo(citas, idPsicologo);
    }

    //Falta este metodo en CitaDAO
    @Override
    public AdeudoDTO obtenerAdeudo(Long idPsicologo) {
        return null;
    }
}
