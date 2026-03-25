/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package org.itson.datos.interfaces;

import org.itson.dominio.entidades.Psicologo;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author erika
 */
public interface IPsicologoDAO {

    List<Psicologo> obtenerPsicologos();

    Psicologo registrarPsicologo(Psicologo psicologo);

    Optional<Psicologo> findById(Long id);
}
