/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package org.itson.datos.implementaciones;

import org.itson.dominio.entidades.Pago;
import org.itson.datos.interfaces.IPagoDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author erika
 */
@Repository
public interface PagoDAO extends JpaRepository<Pago, Long>, IPagoDAO {
    // Spring une automáticamente PagoRepository con PagoDAOImpl??
}
