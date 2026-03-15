/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package interfaces;

import java.util.List;
import org.itson.dto.CubiculoDTO;

/**
 *
 * @author erika
 */
public interface ICubiculoBO {
    public List<CubiculoDTO> obtenerCubiculos();
    public CubiculoDTO registrarCubiculo(CubiculoDTO cubiculodto);
}
