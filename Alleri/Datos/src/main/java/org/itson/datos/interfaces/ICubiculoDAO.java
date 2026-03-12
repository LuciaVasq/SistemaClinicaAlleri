/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package org.itson.datos.interfaces;

import org.itson.dominio.entidades.Cubiculo;
import java.util.List;

/**
 *
 * @author erika
 */
public interface ICubiculoDAO {
    List<Cubiculo> obtenerCubiculos();
}