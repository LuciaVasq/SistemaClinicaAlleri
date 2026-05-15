///*
// * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
// */
//package org.itson.datos;
//
//import org.itson.dominio.entidades.Adeudo;
//import org.itson.dominio.entidades.Cita;
//import org.itson.dominio.entidades.Cubiculo;
//import org.itson.dominio.entidades.Paciente;
//import org.itson.dominio.entidades.Pago;
//import org.itson.dominio.entidades.Psicologo;
//import org.itson.dominio.entidades.Recepcionista;
//import org.itson.dominio.enumeradores.MetodoPago;
//import org.itson.datos.implementaciones.AdeudoDAO;
//import org.itson.datos.implementaciones.CitaDAO;
//import org.itson.datos.implementaciones.CubiculoDAO;
//import org.itson.datos.implementaciones.PacienteDAO;
//import org.itson.datos.implementaciones.PagoDAO;
//import org.itson.datos.implementaciones.PsicologoDAO;
//import java.math.BigDecimal;
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//import org.itson.datos.implementaciones.RecepcionistaDAO;
//import org.itson.datos.interfaces.IAdeudoDAO;
//import org.itson.datos.interfaces.ICitaDAO;
//import org.itson.datos.interfaces.ICubiculoDAO;
//import org.itson.datos.interfaces.IPacienteDAO;
//import org.itson.datos.interfaces.IPagoDAO;
//import org.itson.datos.interfaces.IPsicologoDAO;
//import org.itson.datos.interfaces.IRecepcionistaDAO;
//import org.itson.dominio.enumeradores.Estado;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.boot.autoconfigure.domain.EntityScan;
//import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
//
///**
// *
// * @author erika
// */
//@SpringBootApplication(scanBasePackages = {
//    "org.itson.datos",
//    "org.itson.dominio"
//})
//@EntityScan(basePackages = "org.itson.dominio.entidades")
//@EnableJpaRepositories(basePackages = "org.itson.datos.implementaciones")
//public class MainPruebaDAO implements CommandLineRunner {
//
//    @Autowired
//    private IPsicologoDAO psicologoDAO;
//
//    @Autowired
//    private IPacienteDAO pacienteDAO;
//
//    @Autowired
//    private ICitaDAO citaDAO;
//
//    @Autowired
//    private ICubiculoDAO cubiculoDAO;
//
//    @Autowired
//    private IAdeudoDAO adeudoDAO;
//
//    @Autowired
//    private PagoDAO pagoDAO;
//    
//    @Autowired
//    private IRecepcionistaDAO recepcionistaDAO;
//
//    @Autowired
//    private jakarta.persistence.EntityManager entityManager;
//
//    public static void main(String[] args) {
//        SpringApplication.run(MainPruebaDAO.class, args);
//    }
//
//    @Override
//    public void run(String... args) throws Exception {
//        
////        Paciente pacienteObtenido = pacienteDAO.obtenerPaciente(1L); 
////        
////        pacienteObtenido.setEstado(Estado.INACTIVO);
////        Paciente pacienteActualizado = pacienteDAO.editarPaciente(pacienteObtenido);
////        
////        Optional<Psicologo> psicologoEditado = psicologoDAO.findById(2L);
////        
////        psicologoEditado.get().setEstado(Estado.ACTIVO);
////        Psicologo psicologoActualizado = psicologoDAO.editarPsicologo(psicologoEditado.get());
//        
//        
//        Adeudo adeudo = new Adeudo();
//        adeudo.setTotal(BigDecimal.ZERO);
//        
//        Adeudo adeudo2 = new Adeudo();
//        adeudo.setTotal(BigDecimal.ZERO);
//
//        Psicologo psicologo = new Psicologo();
//        psicologo.setNombre("Lucia");
//        psicologo.setApellidoPaterno("Vasquez");
//        psicologo.setApellidoMaterno("Gastelum");
//        psicologo.setCorreo("lucia@gmail.com");
//        psicologo.setTelefono("64433333333");
//        psicologo.setEstado(Estado.ACTIVO);
//        psicologo.setAdeudo(adeudo); 
//        Psicologo psicologoGuardado = psicologoDAO.registrarPsicologo(psicologo);
//        
//        Psicologo psicologo2 = new Psicologo();
//        psicologo2.setNombre("Pablo");
//        psicologo2.setApellidoPaterno("Zamora");
//        psicologo2.setApellidoMaterno("Gamez");
//        psicologo2.setCorreo("pablo@gmail.com");
//        psicologo2.setTelefono("644555555555");
//        psicologo2.setAdeudo(adeudo2); 
//        Psicologo psicologoGuardado2 = psicologoDAO.registrarPsicologo(psicologo2);
//
//        Paciente paciente = new Paciente();
//        paciente.setNombre("Marisol");
//        paciente.setApellidoPaterno("Ruiz");
//        paciente.setApellidoMaterno("Gonsalez");
//        paciente.setCorreo("Marisol@gmail.com");
//        paciente.setTelefono("6441111111");
//        paciente.setPsicologo(psicologoGuardado);
//        Paciente pacienteG1 = pacienteDAO.registrarPaciente(paciente);
//        
//        Paciente paciente2 = new Paciente();
//        paciente2.setNombre("Victoria");
//        paciente2.setApellidoPaterno("Villalba");
//        paciente2.setApellidoMaterno("Beltran");
//        paciente2.setCorreo("Victoria@gmail.com");
//        paciente2.setTelefono("644222222");
//        paciente2.setPsicologo(psicologoGuardado);
//        Paciente pacienteG2 = pacienteDAO.registrarPaciente(paciente2);
//       
//        Cubiculo cubiculo = new Cubiculo();
//        cubiculo.setNombre("Cubiculo 1");
//        Cubiculo cubiculoGuardado = cubiculoDAO.registrarCubiculo(cubiculo); 
//        
//        BigDecimal precioCita = new BigDecimal("100");
//        Adeudo adeudoPsicologo = psicologoGuardado.getAdeudo();
//        adeudoPsicologo.setTotal(adeudoPsicologo.getTotal().add(precioCita));
//        Adeudo adeudoActualizado = adeudoDAO.registrarAdeudo(adeudoPsicologo);
//
//        Recepcionista recepcionista = new Recepcionista();
//        recepcionista.setUsuario("recep1");
//        recepcionista.setContrasenia("1234");
//        recepcionistaDAO.registrarRecepcionista(recepcionista);
//
//        Cita cita = new Cita();
//        cita.setFechaHoraInicio(LocalDateTime.now());
//        cita.setFechaHoraFin(LocalDateTime.now().plusHours(1));
//        cita.setPrecio(precioCita);
//        cita.setPaciente(paciente);
//        cita.setPsicologo(psicologoGuardado);
//        cita.setRecepcionista(recepcionista);
//        cita.setCubiculo(cubiculoGuardado);
//        cita.setAdeudo(adeudoActualizado);
//        Cita citaGuardada = citaDAO.agendarCita(cita);
//
//        Pago pago = new Pago();
//        pago.setFechaHora(LocalDateTime.now());
//        pago.setTotal(precioCita);
//        pago.setConcepto("Pago de consulta");
//        pago.setMetodoPago(MetodoPago.EFECTIVO);
//        
////        pago.setAdeudo(adeudoActualizado);
//        pago.setPsicologo(psicologoGuardado);
//        pagoDAO.save(pago);
//    }
//}
