/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package org.itson.negocio;

import implementaciones.PsicologoBO;
import interfaces.ICitaBO;
import interfaces.ICubiculoBO;
import interfaces.IPacienteBO;
import interfaces.IPagoBO;
import interfaces.IPsicologoBO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 *
 * @author erika
 */
@SpringBootApplication
@ComponentScan(basePackages = {"org.itson.negocio", "implementaciones", "org.itson.datos","Mappers","IMappers"})
public class Negocio implements CommandLineRunner {
    
    @Autowired
    private IPsicologoBO psicologoBO;
    @Autowired
    private ICitaBO citaBO;
    @Autowired
    private ICubiculoBO cubiculoBO;
    @Autowired
    private IPacienteBO pacienteBO;
    @Autowired
    private IPagoBO pagoBO;

    public static void main(String[] args) {
        SpringApplication.run(Negocio.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Psicologos: "+psicologoBO.obtenerPsicologos());
    }
}
