/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package interfaces;

import entidades.Cita;
import java.util.List;

/**
 *
 * @author erika
 */
public interface IAdeudoDAO {
    void actualizarAdeudo(List<Cita> citas, Long idPsicologo);
}
