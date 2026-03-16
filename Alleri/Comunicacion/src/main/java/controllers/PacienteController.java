package controllers;

import interfaces.IPacienteBO;
import java.util.List;
import org.itson.dto.PacienteDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controlador Rest que recibe peticiones HTTP para realizar operaciones
 * relacionadas con pacientes.
 *
 * @author victoria
 */

@RestController
@RequestMapping("/api/pacientes")
@CrossOrigin(origins = "*")
public class PacienteController {
    
    @Autowired
    private IPacienteBO pacienteBO;
    
    /**Recibe una petición GET y obtiene los pacientes registrados. */
    @GetMapping
    public ResponseEntity<List<PacienteDTO>> obtenerPacientes(){
        return ResponseEntity.ok(pacienteBO.obtenerPacientes());
    }
}
