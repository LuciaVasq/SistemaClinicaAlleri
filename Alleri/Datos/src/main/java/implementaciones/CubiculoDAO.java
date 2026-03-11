/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package implementaciones;

import entidades.Cubiculo;
import interfaces.ICubiculoDAO;
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
}