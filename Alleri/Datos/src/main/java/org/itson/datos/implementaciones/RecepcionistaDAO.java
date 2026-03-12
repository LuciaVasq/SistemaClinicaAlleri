/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package org.itson.datos.implementaciones;

import org.itson.datos.interfaces.IRecepcionistaDAO;
import org.itson.dominio.entidades.Recepcionista;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author pablo
 */
public interface RecepcionistaDAO extends JpaRepository<Recepcionista, Long>, IRecepcionistaDAO {
    @Override
    default Recepcionista registrarRecepcionista(Recepcionista recepcionista) {
        return save(recepcionista);
    }
}
