/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package interfaces;

import java.util.List;
import org.itson.dto.PsicologoDTO;

/**
 *
 * @author erika
 */
public interface IPsicologoBO {
    public List<PsicologoDTO> obtenerPsicologos();
    public PsicologoDTO registrarPsicologo(PsicologoDTO psicologodto);
}
