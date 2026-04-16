package interfaces;

import org.itson.dominio.entidades.Cita;

/**
 * Interfaz que indica las operaciones de un mensajero dentro de la aplicación.
 * El mensajero se encarga de notificar al psicólogo y al paciente que tienen una cita agendada.
 * @author victoria
 */
public interface IMensajeroBO {
    
    public void notificarNuevaCita(Cita nuevaCita);
}
