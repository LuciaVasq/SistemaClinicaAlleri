/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package interfaces;

import java.time.LocalDateTime;
import java.util.List;
import org.itson.dto.AdeudoDTO;
import org.itson.dto.CitaDTO;

/**
 *
 * @author erika
 */
public interface ICitaBO {
    CitaDTO agendarCita(CitaDTO nuevaCita);
    CitaDTO editarCita(CitaDTO cita);
    CitaDTO eliminarCita(CitaDTO cita);
    List<CitaDTO> obtenerCitas(LocalDateTime dia);
    void actualizarAdeudo(List<CitaDTO> citas, Long idPsicologo);
    AdeudoDTO obtenerAdeudo(Long idPsicologo);
    Boolean validarCita(CitaDTO nuevaCita);
}
