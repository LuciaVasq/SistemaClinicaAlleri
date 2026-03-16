package controllers;

import interfaces.ICubiculoBO;
import java.util.List;
import org.itson.dto.CubiculoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controlador Rest que recibe peticiones HTTP para realizar operaciones
 * relacionadas con cubiculos.
 *
 * @author victoria
 */
@RestController
@RequestMapping("/api/cubiculos")
@CrossOrigin(origins = "*")
public class CubiculoController {
    
    @Autowired
    private ICubiculoBO cubiculoBO;
    
     /**
     * Recibe una petición GET y obtiene los cubiculos registrados.
     */
    @GetMapping
    public ResponseEntity<List<CubiculoDTO>> obtenerCubiculos(){
        return ResponseEntity.ok(cubiculoBO.obtenerCubiculos());
    }
}
