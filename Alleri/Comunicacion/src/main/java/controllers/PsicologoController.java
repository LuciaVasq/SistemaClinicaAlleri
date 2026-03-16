package controllers;

import interfaces.IPsicologoBO;
import java.util.List;
import org.itson.dto.PsicologoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controlador Rest que recibe peticiones HTTP para realizar operaciones
 * relacionadas con psicologos.
 *
 * @author victoria
 */
@RestController
@RequestMapping("/api/psicologos")
@CrossOrigin(origins = "*")
public class PsicologoController {
    
    @Autowired
    private IPsicologoBO psicologoBO;
    
    /**
     * Recibe una petición GET y obtiene los psicologos registrados.
     */
    @GetMapping
    public ResponseEntity<List<PsicologoDTO>> obtenerPsicologos(){
        return ResponseEntity.ok(psicologoBO.obtenerPsicologos());
    }
}
