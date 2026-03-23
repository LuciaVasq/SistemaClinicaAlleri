package controllers;

import interfaces.ICitaBO;
import java.time.LocalDateTime;
import java.util.List;
import org.itson.dto.CitaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Controlador Rest que recibe peticiones HTTP para realizar operaciones
 * relacionadas con citas.
 *
 * @author victoria
 */
@RestController
@RequestMapping("/api/citas")
@CrossOrigin(origins = "*")
public class CitaController {

    @Autowired
    private ICitaBO citaBO;

    /**
     * Recibe una petición POST para agendar una nueva cita.
     */
    @PostMapping("/agendar")
    public ResponseEntity<CitaDTO> agendarCita(@RequestBody CitaDTO nuevaCita) {
        return ResponseEntity.ok(citaBO.agendarCita(nuevaCita));
    }

    /**
     * Recibe una petición GET y obtiene las citas (agendadas y canceladas) de
     * la fecha actual del sistema.
     */
    @GetMapping("/obtener")
    public ResponseEntity<List<CitaDTO>> obtenerCitas(@RequestParam("dia") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dia){
        return ResponseEntity.ok(citaBO.obtenerCitas(dia));
    }
    
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<CitaDTO> actualizarCita(@PathVariable int id, @RequestBody CitaDTO citaModificada) {

        citaModificada.setId(id); 

        CitaDTO citaEditada = citaBO.editarCita(citaModificada);

        return ResponseEntity.ok(citaEditada);
    }

}
