/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */
package org.itson.negocio;

import Enumeradores.EstadoDTO;
import Enumeradores.MetodoPagoDTO;
import IMappers.PagoMapper;
import IMappers.UsuarioMapper;
import implementaciones.PsicologoBO;
import interfaces.ICitaBO;
import interfaces.ICubiculoBO;
import interfaces.IPacienteBO;
import interfaces.IPagoBO;
import interfaces.IPsicologoBO;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.itson.datos.implementaciones.PagoDAO;
import org.itson.datos.interfaces.IRecepcionistaDAO;
import org.itson.dominio.entidades.Pago;
import org.itson.dominio.entidades.Recepcionista;
import org.itson.dto.AdeudoDTO;
import org.itson.dto.CitaDTO;
import org.itson.dto.CubiculoDTO;
import org.itson.dto.PacienteDTO;
import org.itson.dto.PagoDTO;
import org.itson.dto.PsicologoDTO;
import org.itson.dto.UsuarioDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 *
 * @author erika
 */
//@SpringBootApplication
//@EntityScan(basePackages = "org.itson.dominio.entidades")
//@EnableJpaRepositories(basePackages = "org.itson.datos.implementaciones")
//@ComponentScan(basePackages = {"org.itson.negocio", "implementaciones", "org.itson.datos", "IMappers", "iterfaces"})
public class Negocio {

//    @Autowired
//    private IPsicologoBO psicologoBO;
//    @Autowired
//    private ICitaBO citaBO;
//    @Autowired
//    private ICubiculoBO cubiculoBO;
//    @Autowired
//    private IPacienteBO pacienteBO;
//    @Autowired
//    private IPagoBO pagoBO;
//
//    @Autowired
//    private IRecepcionistaDAO recepcionistaDAO; //Solo está pq se ocupa un recepcionista registrado
//    @Autowired
//    private UsuarioMapper usuarioMapper;
//    @Autowired
//    private PagoMapper pagoMapper;
//    @Autowired
//    private PagoDAO pagoDAO; //Solo se ocupa para registrar el pago
//
//    public static void main(String[] args) {
//        SpringApplication.run(Negocio.class, args);
//    }
//
//    @Override
//    public void run(String... args) throws Exception {
//
//        AdeudoDTO adeudo = new AdeudoDTO();
//        adeudo.setId(null);
//        adeudo.setTotal(BigDecimal.ZERO);
//
//        PsicologoDTO psicologo = new PsicologoDTO();
//        psicologo.setNombre("Victoria");
//        psicologo.setApellidoPaterno("Villalba");
//        psicologo.setApellidoMaterno("Beltran");
//        psicologo.setCorreo("biqipro777@lunita.com");
//        psicologo.setTelefono("6443567865");
//        psicologo.setEstado(EstadoDTO.ACTIVO);
//        psicologo.setAdeudo(adeudo);
//        PsicologoDTO psicologoGuardado = psicologoBO.registrarPsicologo(psicologo);
//
//        CubiculoDTO cubiculo = new CubiculoDTO();
//        cubiculo.setNombre("Cubiculo 2");
//        CubiculoDTO cubiculoGuardado = cubiculoBO.registrarCubiculo(cubiculo);
//
//        PacienteDTO paciente = new PacienteDTO();
//        paciente.setNombre("Pablo");
//        paciente.setApellidoPaterno("Zamora");
//        paciente.setApellidoMaterno("Gamez");
//        paciente.setCorreo("pable@gmail.com");
//        paciente.setTelefono("6433333333");
//        paciente.setEstado(EstadoDTO.ACTIVO);
//        paciente.setPsicologo(psicologoGuardado);
//        PacienteDTO pacienteGuardado = pacienteBO.registrarPaciente(paciente);
//
//        BigDecimal precioCita = new BigDecimal("100");
//        AdeudoDTO adeudoPsicologo = psicologoGuardado.getAdeudo();
//        adeudoPsicologo.setTotal(adeudoPsicologo.getTotal().add(precioCita));
//        AdeudoDTO adeudoActualizado = citaBO.registrarAdeudo(adeudoPsicologo);
//
//        Recepcionista recepcionista = new Recepcionista();
//        recepcionista.setUsuario("recep2");
//        recepcionista.setContrasenia("1244");
//        recepcionistaDAO.registrarRecepcionista(recepcionista);
//
//        UsuarioDTO recepcionistadto = usuarioMapper.toDTOUsuario(recepcionista);
//
//        CitaDTO cita = new CitaDTO();
//        cita.setFechaHoraInicio(LocalDateTime.now().plusDays(1));
//        cita.setFechaHoraFin(LocalDateTime.now().plusDays(1).plusHours(1));
//        cita.setPrecio(precioCita);
//        cita.setPaciente(pacienteGuardado);
//        cita.setPsicologo(psicologoGuardado);
//        cita.setRecepcionista(recepcionistadto);
//        cita.setCubiculo(cubiculoGuardado);
//        cita.setAdeudo(adeudoActualizado);
//        cita.setPrecio(precioCita);
//
//        CitaDTO citaGuardada = citaBO.agendarCita(cita);
//
//    }
}
