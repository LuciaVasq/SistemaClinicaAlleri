/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package org.itson.datos.implementaciones;

import org.itson.dominio.entidades.Psicologo;
import org.itson.datos.interfaces.IPsicologoDAO;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author erika
 */
@Repository
public interface PsicologoDAO extends JpaRepository<Psicologo, Long>, IPsicologoDAO {
    @Override
    default List<Psicologo> obtenerPsicologos() {
        return findAll();
    }
    @Override
    default Psicologo registrarPsicologo(Psicologo psicologo) {
        return save(psicologo);
    }
}