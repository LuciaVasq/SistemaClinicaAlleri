package implementaciones;

import interfaces.IMensajeroBO;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import org.itson.dominio.entidades.Cita;
import org.itson.dto.CitaDTO;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;

/**
 *
 * @author victoria
 */
@Service
public class MensajeroBO implements IMensajeroBO {

    @Autowired
    private JavaMailSender mailSender;

    @Async
    @Override
    public void notificarNuevaCita(Cita nuevaCita) {
        SimpleMailMessage mensajePsicologo = new SimpleMailMessage();
        SimpleMailMessage mensajePaciente = new SimpleMailMessage();

        DateTimeFormatter formatoHora = DateTimeFormatter.ofPattern("HH:mm");

        String correoPsicologo = nuevaCita.getPsicologo().getCorreo();
        String correoPaciente = nuevaCita.getPaciente().getCorreo();

        mensajePsicologo.setTo(correoPsicologo);
        mensajePaciente.setTo(correoPaciente);

        String concepto = "Clínica Alleri: Confirmación de nueva cita agendada";
        mensajePsicologo.setSubject(concepto);
        mensajePaciente.setSubject(concepto);

        String textoPsicologo = "Hola, ${nombrePsicologo}!\n\n"
                + "Se ha registrado una nueva cita a su nombre.\n"
                + "Paciente: ${nombrePaciente}\n"
                + "Fecha de la cita: ${fechaInicio} - ${fechaFin}, en el cubículo: ${numeroCubiculo}.\n\n"
                + "Le recordamos realizar el pago de la renta al finalizar la cita.\n"
                + "¡Le esperamos pronto!\n"
                + "Atte: Sistema de citas Clinica Alleri";

        String textoPaciente = "Hola, ${nombrePaciente}!\n\n"
                + "Se ha agendado correctamente su cita.\n"
                + "Psicólogo: ${nombrePsicologo}\n"
                + "Fecha de la cita: ${fechaInicio} - ${fechaFin}, en el cubículo: ${numeroCubiculo}.\n"
                + "Le recordamos realizar el pago de la cita con el psicólogo asignado.\n"
                + "¡Le esperamos pronto!\n"
                + "Atte: Sistema de citas Clinica Alleri";

        Map<String, Object> variables = new HashMap<>();
        variables.put("nombrePaciente", nuevaCita.getPaciente().getNombre());
        variables.put("nombrePsicologo", nuevaCita.getPsicologo().getNombre());
        variables.put("fechaInicio", nuevaCita.getFechaHoraInicio().format(formatoHora));
        variables.put("fechaFin", nuevaCita.getFechaHoraFin().format(formatoHora));
        variables.put("numeroCubiculo", nuevaCita.getCubiculo().getNombre());

        for (Map.Entry<String, Object> variable : variables.entrySet()) {
            textoPsicologo = textoPsicologo.replace("${" + variable.getKey() + "}", variable.getValue().toString());
            textoPaciente = textoPaciente.replace("${" + variable.getKey() + "}", variable.getValue().toString());
        }

        mensajePaciente.setText(textoPaciente);
        mensajePsicologo.setText(textoPsicologo);

        mailSender.send(mensajePaciente);
        mailSender.send(mensajePsicologo);

    }

}
