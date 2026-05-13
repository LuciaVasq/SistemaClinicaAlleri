package org.itson.datos.implementaciones;

import jakarta.persistence.EntityNotFoundException;
import org.itson.dominio.entidades.Paciente;
import org.itson.datos.interfaces.IPacienteDAO;
import java.util.List;
import org.itson.dominio.enumeradores.Estado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author erika
 */
@Repository
public interface PacienteDAO extends JpaRepository<Paciente, Long>, IPacienteDAO {
    @Override
    default Paciente obtenerPaciente(Long idPaciente){
        Paciente paciente = findById(idPaciente).orElseThrow(() -> new EntityNotFoundException("El paciente no existe"));
        return paciente;
    }
    
    @Override
    default List<Paciente> obtenerPacientes() {
        return findAll();
    }
    
    @Override
    default Paciente registrarPaciente(Paciente paciente) {
        return save(paciente);
    }
    
    @Override
    default Paciente editarPaciente(Paciente pacienteEditado){
        return save(pacienteEditado);
    }
}
