/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package interfaces;

import java.util.List;
import org.itson.dto.CitaDTO;
import org.itson.dto.PagoDTO;

/**
 *
 * @author erika
 */
public interface IPagoBO {
    PagoDTO pagarCitas(List<CitaDTO> citas, Long idPsicologo);
}
