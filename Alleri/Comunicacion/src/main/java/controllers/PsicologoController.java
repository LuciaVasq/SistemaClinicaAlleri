package controllers;

import interfaces.IPsicologoBO;
import java.util.List;
import org.itson.dto.PsicologoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public ResponseEntity<List<PsicologoDTO>> obtenerPsicologos() {
        return ResponseEntity.ok(psicologoBO.obtenerPsicologos());
    }

    @PostMapping("/registrar")
    public ResponseEntity<PsicologoDTO> registrarPsicologo(@RequestBody PsicologoDTO psicologoDTO) {
        PsicologoDTO nuevoPsicologo = psicologoBO.registrarPsicologo(psicologoDTO);
        return ResponseEntity.ok(nuevoPsicologo);

    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<PsicologoDTO> editarPsicologo(@PathVariable int id, @RequestBody PsicologoDTO psicologoDTO) {
        psicologoDTO.setId(id);
        PsicologoDTO psicologoActualizado = psicologoBO.editarPsicologo(psicologoDTO);
        return ResponseEntity.ok(psicologoActualizado);
    }
}
