/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package implementaciones;

import IMappers.AdeudoMapper;
import IMappers.CitaMapper;
import interfaces.ICitaBO;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.itson.datos.interfaces.IAdeudoDAO;
import org.itson.datos.interfaces.ICitaDAO;
import org.itson.datos.interfaces.ICubiculoDAO;
import org.itson.dominio.entidades.Adeudo;
import org.itson.dominio.entidades.Cita;
import org.itson.dominio.entidades.Psicologo;
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

    @Autowired
    private AdeudoMapper adeudoMapper;

    @Override
    public CitaDTO agendarCita(CitaDTO nuevaCita) {
        if (nuevaCita.getFechaHoraInicio().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("No se puede agendar una cita en el pasado.");
        }

        if (nuevaCita.getPsicologo() == null || nuevaCita.getCubiculo() == null || nuevaCita.getPaciente() == null) {
            throw new RuntimeException("La cita no puede ser agendada debido a información faltante.");
        }

        Cita citanueva = citaMapper.toCita(nuevaCita);
        Cita guardada = citaDAO.agendarCita(citanueva);
        adeudoDAO.actualizarAdeudo(List.of(guardada), guardada.getPsicologo().getId());

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

        if (citaEditada.getPsicologo() == null || citaEditada.getCubiculo() == null || citaEditada.getPaciente() == null) {
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
        
        Optional<Cita> optional = citaDAO.findById(Long.valueOf(cita.getId()));
        if (!optional.isPresent()) {
            throw new RuntimeException("Cita no encontrada");
        }
        Cita existente = optional.get();
        Psicologo psicologo = existente.getPsicologo();
        Adeudo adeudo = psicologo.getAdeudo();
        if (adeudo != null && adeudo.getTotal() != null) {
            BigDecimal nuevoTotal = adeudo.getTotal().subtract(existente.getPrecio());

            if (nuevoTotal.compareTo(BigDecimal.ZERO) < 0) {
                nuevoTotal = BigDecimal.ZERO;
            }

            adeudo.setTotal(nuevoTotal);
            adeudoDAO.registrarAdeudo(adeudo);
        }

        Cita eliminada = citaDAO.eliminarCita(existente);

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

        if (citas == null || citas.isEmpty()) {
            throw new RuntimeException("No se obtuvieron citas a las cuales actualizarle el adeudo.");
        }

        adeudoDAO.actualizarAdeudo(citas, idPsicologo);
    }

    @Override
    public AdeudoDTO obtenerAdeudo(Long idPsicologo) {
        Adeudo adeudo = adeudoDAO.obtenerAdeudo(idPsicologo);
        return adeudoMapper.toDTOAdeudo(adeudo);
    }

    @Override
    public AdeudoDTO registrarAdeudo(AdeudoDTO adeudo) {
        Adeudo adeudoNuevo = adeudoDAO.registrarAdeudo(adeudoMapper.toAdeudo(adeudo));
        return adeudoMapper.toDTOAdeudo(adeudoNuevo);
    }
}
