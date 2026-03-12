/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package org.itson.datos.interfaces;

import org.itson.dominio.entidades.Cita;
import java.util.List;
import org.itson.dominio.entidades.Adeudo;

/**
 *
 * @author erika
 */
public interface IAdeudoDAO {
    void actualizarAdeudo(List<Cita> citas, Long idPsicologo);
    Adeudo registrarAdeudo(Adeudo adeudo);
}
