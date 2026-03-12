/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package org.itson.datos.implementaciones;

import org.itson.dominio.entidades.Cubiculo;
import org.itson.datos.interfaces.ICubiculoDAO;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author erika
 */
@Repository
public interface CubiculoDAO extends JpaRepository<Cubiculo, Long>, ICubiculoDAO {
    @Override
    default List<Cubiculo> obtenerCubiculos() {
        return findAll();
    }
    @Override
    default Cubiculo registrarCubiculo(Cubiculo cubiculo) {
        return save(cubiculo);
    }
}